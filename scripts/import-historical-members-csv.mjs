#!/usr/bin/env node
// One-shot import: read paid memberships from a Google Forms CSV export
// (3-header-row format) and upsert them into the Turso `members` table.
// Idempotent — safe to re-run.
//
// Run: `npm run db:import-csv` (or with a different path: `... <path>`)
// Add `--dry-run` to preview without writing.

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'csv-parse/sync';
import { createClient } from '@libsql/client';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

for (const name of ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN']) {
	if (!process.env[name]) {
		console.error(`Missing env var: ${name}`);
		process.exit(1);
	}
}

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const csvPath = args.find((a) => !a.startsWith('--')) ?? './members.csv';

// 0-indexed positions in the CSV; the file is documented as 1-indexed in the
// plan but the data is array-shaped here.
const COL = {
	timestamp: 0,
	betalt: 2,
	fornavn: 6,
	etternavn: 7,
	email: 16,
	periode: 29,
	aar: 30,
	semester: 31,
	helarType: 32,
	semesterType: 33
};

const HEADER_ROW_COUNT = 3;

// Norwegian month names → 1-indexed month numbers. Used to parse the end-date
// of a period like "Helårsmedlemskap (1. juli 2020 - 30. juni 2021) / …".
const NB_MONTHS = {
	januar: 1,
	februar: 2,
	mars: 3,
	april: 4,
	mai: 5,
	juni: 6,
	juli: 7,
	august: 8,
	september: 9,
	oktober: 10,
	november: 11,
	desember: 12
};

const PERIOD_END_RE = new RegExp(
	`-\\s*(\\d{1,2})\\.?\\s+(${Object.keys(NB_MONTHS).join('|')})\\s+(\\d{4})`,
	'i'
);

// "M/D/YYYY" (with optional time after the date) → ISO 8601 UTC midnight.
function parseTimestampToIso(raw) {
	const m = raw.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
	if (!m) return null;
	const [, month, day, year] = m;
	const d = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function parseExpiryDateToIso(periodText) {
	const m = periodText.match(PERIOD_END_RE);
	if (!m) return null;
	const [, day, monthName, year] = m;
	const month = NB_MONTHS[monthName.toLowerCase()];
	if (!month) return null;
	const d = new Date(Date.UTC(Number(year), month - 1, Number(day)));
	return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function deriveMembershipType(row) {
	const isYear = row[COL.aar] === 'TRUE';
	const isSemester = row[COL.semester] === 'TRUE';
	if (isYear === isSemester) return null; // need exactly one
	const category = isYear ? 'full' : 'semester';
	// A handful of rows have the tier text in the "wrong" column (e.g. sem=TRUE
	// but the text is in the helarType column). Read from either.
	const tierText = (row[COL.helarType] || row[COL.semesterType] || '').trim();
	let tier;
	if (/^Redusert/i.test(tierText)) tier = 'reduced';
	else if (/^Ordinær/i.test(tierText)) tier = 'regular';
	else return null;
	return `${category}-${tier}`;
}

function syntheticId(email, timestamp) {
	const hash = createHash('sha256').update(`${email}|${timestamp}`).digest('hex').slice(0, 16);
	return `legacy-${hash}`;
}

const UPSERT_SQL = `
    INSERT INTO members (
        id, name, email, membership_type, registered_at,
        psp_reference, payment_date, payment_type, expiry_date, email_sent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        email = excluded.email,
        membership_type = excluded.membership_type,
        registered_at = COALESCE(excluded.registered_at, members.registered_at),
        psp_reference = COALESCE(excluded.psp_reference, members.psp_reference),
        payment_date = COALESCE(excluded.payment_date, members.payment_date),
        payment_type = COALESCE(excluded.payment_type, members.payment_type),
        expiry_date = COALESCE(excluded.expiry_date, members.expiry_date),
        email_sent = COALESCE(excluded.email_sent, members.email_sent)
`;

function main() {
	console.log(`Reading ${csvPath}…`);
	const text = readFileSync(csvPath, 'utf8');
	const rows = parse(text, { skip_empty_lines: false });
	console.log(`Parsed ${rows.length} CSV records (incl. ${HEADER_ROW_COUNT} header rows).`);

	const data = rows.slice(HEADER_ROW_COUNT);
	const statements = [];
	const skipReasons = {
		blank: 0,
		unpaid: 0,
		badCategory: 0,
		badTier: 0,
		badPeriod: 0,
		badTimestamp: 0
	};
	const skippedExamples = [];

	for (const row of data) {
		const timestamp = (row[COL.timestamp] ?? '').trim();
		const fornavn = (row[COL.fornavn] ?? '').trim();
		const etternavn = (row[COL.etternavn] ?? '').trim();
		const email = (row[COL.email] ?? '').trim();

		if (!timestamp || !fornavn || !etternavn || !email) {
			skipReasons.blank++;
			continue;
		}

		if (row[COL.betalt] !== 'TRUE') {
			skipReasons.unpaid++;
			if (skippedExamples.length < 3)
				skippedExamples.push({ reason: 'unpaid', name: `${fornavn} ${etternavn}` });
			continue;
		}

		const registeredAtIso = parseTimestampToIso(timestamp);
		if (!registeredAtIso) {
			skipReasons.badTimestamp++;
			continue;
		}

		const membershipType = deriveMembershipType(row);
		if (!membershipType) {
			if ((row[COL.aar] === 'TRUE') === (row[COL.semester] === 'TRUE')) skipReasons.badCategory++;
			else skipReasons.badTier++;
			if (skippedExamples.length < 3)
				skippedExamples.push({
					reason: 'type',
					name: `${fornavn} ${etternavn}`,
					aar: row[COL.aar],
					sem: row[COL.semester],
					helarType: row[COL.helarType],
					semType: row[COL.semesterType]
				});
			continue;
		}

		const expiryIso = parseExpiryDateToIso(row[COL.periode] ?? '');
		if (!expiryIso) {
			skipReasons.badPeriod++;
			if (skippedExamples.length < 3)
				skippedExamples.push({
					reason: 'period',
					name: `${fornavn} ${etternavn}`,
					periode: row[COL.periode]
				});
			continue;
		}

		const id = syntheticId(email, registeredAtIso);
		const name = `${fornavn} ${etternavn}`.replace(/\s+/g, ' ').trim();

		statements.push({
			sql: UPSERT_SQL,
			args: [
				id,
				name,
				email,
				membershipType,
				registeredAtIso,
				null,
				null,
				'INVOICE',
				expiryIso,
				null
			]
		});

		if (DRY_RUN && statements.length <= 3) {
			console.log('[dry-run] sample upsert:', {
				id,
				name,
				email,
				membershipType,
				registeredAtIso,
				expiryIso
			});
		}
	}

	const totalSkipped = Object.values(skipReasons).reduce((a, b) => a + b, 0);
	console.log(
		`Prepared ${statements.length} upserts. Skipped ${totalSkipped} (${Object.entries(skipReasons)
			.filter(([, v]) => v > 0)
			.map(([k, v]) => `${k}=${v}`)
			.join(', ')})`
	);
	if (skippedExamples.length) console.log('Skipped examples:', skippedExamples);

	if (DRY_RUN) {
		console.log('[dry-run] No writes performed.');
		return;
	}

	if (statements.length === 0) {
		console.log('Nothing to write.');
		return;
	}

	console.log(`Writing batch of ${statements.length} statements to Turso…`);
	const turso = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });
	return turso.batch(statements, 'write').then(() => {
		console.log('Done.');
	});
}

const result = main();
if (result && typeof result.then === 'function') {
	result.catch((err) => {
		console.error(err);
		process.exit(1);
	});
}
