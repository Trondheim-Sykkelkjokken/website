#!/usr/bin/env node
// One-shot import: read all rows from the legacy `raw_data` Google Sheet and
// upsert them into the Turso `members` table. Idempotent — safe to re-run.
//
// Run: `npm run db:import-sheets`
// (or directly: `node --env-file=.env scripts/import-sheets-to-turso.mjs`)

import { google } from 'googleapis';
import { createClient } from '@libsql/client';
import { createHash } from 'node:crypto';

const {
    GOOGLE_SHEETS_KEY,
    GOOGLE_SHEETS_EMAIL,
    GOOGLE_SHEETS_ID,
    GOOGLE_APPLICATION_CREDENTIALS,
    TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN
} = process.env;

const required = ['GOOGLE_SHEETS_ID', 'TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN'];
for (const name of required) {
    if (!process.env[name]) {
        console.error(`Missing env var: ${name}`);
        process.exit(1);
    }
}
if (!GOOGLE_APPLICATION_CREDENTIALS && !(GOOGLE_SHEETS_KEY && GOOGLE_SHEETS_EMAIL)) {
    console.error('Provide either GOOGLE_APPLICATION_CREDENTIALS (path to service-account JSON)');
    console.error('or both GOOGLE_SHEETS_KEY and GOOGLE_SHEETS_EMAIL.');
    process.exit(1);
}

const DRY_RUN = process.argv.includes('--dry-run');

// Sheet stores dates in two flavors:
//   - ISO 8601 (registered_at, written via JS Date → JSON serialization)
//   - nb-NO "DD.MM.YYYY" (payment_date, expiry_date, written via toLocaleDateString)
// Returns ISO string, or null when input is empty/unparseable.
function toIsoOrNull(value) {
    if (value == null) return null;
    const trimmed = String(value).trim();
    if (!trimmed) return null;

    // nb-NO regex MUST run before `new Date()`: V8 will happily parse "3.10.2025"
    // as March 10 instead of 3 October. Do not reorder.
    const nbMatch = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (nbMatch) {
        const [, dd, mm, yyyy] = nbMatch;
        const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        if (!Number.isNaN(d.getTime())) return d.toISOString();
    }

    const direct = new Date(trimmed);
    if (!Number.isNaN(direct.getTime())) return direct.toISOString();

    return null;
}

// Manual entries typed directly into the sheet don't have a UUID. Derive a
// stable id from the row's identifying fields so the upsert remains idempotent
// across re-runs.
function syntheticId(email, registeredAt, paymentDate) {
    const hash = createHash('sha256')
        .update(`${email}|${registeredAt ?? ''}|${paymentDate ?? ''}`)
        .digest('hex')
        .slice(0, 16);
    return `manual-${hash}`;
}

function parseEmailSent(value) {
    if (value == null) return null;
    const s = String(value).trim().toUpperCase();
    if (s === 'TRUE') return 1;
    if (s === 'FALSE') return 0;
    return null;
}

async function buildAuth() {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    if (GOOGLE_APPLICATION_CREDENTIALS) {
        return new google.auth.GoogleAuth({ scopes });
    }

    // Node's --env-file does not process escape sequences, so a PEM stored as
    // "...\n..." in .env arrives with literal backslash-n. Restore real newlines
    // before handing it to the JWT signer.
    const privateKey = GOOGLE_SHEETS_KEY.replace(/\\n/g, '\n');
    return new google.auth.JWT(GOOGLE_SHEETS_EMAIL, null, privateKey, scopes);
}

async function fetchSheetRows() {
    const auth = await buildAuth();
    if (typeof auth.authorize === 'function') await auth.authorize();
    const sheets = google.sheets('v4');
    const res = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range: 'raw_data!A:J'
    });
    return res.data.values ?? [];
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

async function main() {
    console.log('Fetching rows from Google Sheets...');
    const rows = await fetchSheetRows();
    console.log(`Fetched ${rows.length} rows.`);

    const turso = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });

    let synthesized = 0;
    let skipped = 0;
    const skippedExamples = [];
    const statements = [];

    // Row 0 is the header.
    for (let i = 1; i < rows.length; i++) {
        const [
            id,
            name,
            email,
            membershipType,
            registeredAt,
            pspReference,
            paymentDate,
            paymentType,
            expiryDate,
            emailSent
        ] = rows[i];

        if (!name || !email || !membershipType) {
            skipped++;
            if (skippedExamples.length < 3) skippedExamples.push(rows[i]);
            continue;
        }

        let rowId = id;
        let synthetic = false;
        if (!rowId) {
            rowId = syntheticId(email, registeredAt, paymentDate);
            synthesized++;
            synthetic = true;
        }

        statements.push({
            sql: UPSERT_SQL,
            args: [
                rowId,
                name,
                email,
                membershipType,
                toIsoOrNull(registeredAt) ?? new Date().toISOString(),
                pspReference || null,
                toIsoOrNull(paymentDate),
                paymentType || null,
                toIsoOrNull(expiryDate),
                parseEmailSent(emailSent)
            ]
        });

        if (DRY_RUN) {
            console.log('[dry-run] would upsert:', { id: rowId, name, email, membershipType, synthetic });
        }
    }

    if (!DRY_RUN && statements.length > 0) {
        await turso.batch(statements, 'write');
    }

    const verb = DRY_RUN ? 'Would upsert' : 'Upserted';
    console.log(`Done. ${verb} ${statements.length} rows (${synthesized} with synthetic ids). Skipped ${skipped}.`);
    if (skippedExamples.length) {
        console.log('Skipped examples:', skippedExamples);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
