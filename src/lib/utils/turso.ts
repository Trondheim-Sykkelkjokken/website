// Use the /web entry so esbuild doesn't pull in @libsql's native sqlite
// bindings, which aren't bundled into Netlify Functions and cause the
// /membership POST handler to 500 at module load.
import { createClient, type Client } from '@libsql/client/web';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import type { PaymentType } from './vipps';

let client: Client | null = null;

function getClient(): Client {
	if (!client) {
		client = createClient({
			url: TURSO_DATABASE_URL,
			authToken: TURSO_AUTH_TOKEN
		});
	}
	return client;
}

export async function saveMemberToTurso(formData: FormData) {
	const id = formData.get('id')?.toString();
	const name = formData.get('name')?.toString();
	const email = formData.get('email')?.toString();
	const membershipType = formData.get('membershipType')?.toString();

	if (!id || !name || !email || !membershipType) {
		throw new Error('[saveMemberToTurso] Missing required form fields');
	}

	await getClient().execute({
		sql: `INSERT INTO members (id, name, email, membership_type)
              VALUES (?, ?, ?, ?)`,
		args: [id, name, email, membershipType]
	});
}

export async function tursoBestEffort(label: string, fn: () => Promise<void>) {
	try {
		await fn();
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		console.error(`[${label}] Turso write failed: ${msg}`);
	}
}

export async function addPaymentDetailsToTurso(
	id: string,
	pspReference: string,
	paymentType: PaymentType,
	expiryDate?: Date
) {
	await getClient().execute({
		sql: `UPDATE members
              SET psp_reference = ?,
                  payment_date = ?,
                  payment_type = ?,
                  expiry_date = COALESCE(?, expiry_date)
              WHERE id = ?`,
		args: [
			pspReference,
			new Date().toISOString(),
			paymentType,
			expiryDate ? expiryDate.toISOString() : null,
			id
		]
	});
}

export async function updateEmailStatusInTurso(id: string, sent: boolean) {
	await getClient().execute({
		sql: `UPDATE members SET email_sent = ? WHERE id = ?`,
		args: [sent ? 1 : 0, id]
	});
}

export interface MemberRow {
	id: string;
	name: string;
	email: string;
	membership_type: string;
	registered_at: string;
	psp_reference: string | null;
	payment_date: string | null;
	payment_type: string | null;
	expiry_date: string | null;
	email_sent: number | null;
}

export async function getAllMembers(): Promise<MemberRow[]> {
	const res = await getClient().execute(
		`SELECT id, name, email, membership_type, registered_at,
                psp_reference, payment_date, payment_type, expiry_date, email_sent
         FROM members
         ORDER BY registered_at DESC`
	);
	return res.rows as unknown as MemberRow[];
}

export interface MemberCounts {
	total: number;
	active: number;
}

export async function getMemberCounts(): Promise<MemberCounts> {
	const res = await getClient().execute(
		`SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN expiry_date IS NOT NULL AND datetime(expiry_date) > datetime('now') THEN 1 ELSE 0 END) AS active
         FROM members`
	);
	const row = res.rows[0] as unknown as { total: number; active: number | null };
	return { total: Number(row.total), active: Number(row.active ?? 0) };
}
