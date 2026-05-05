import { createClient, type Client } from '@libsql/client';
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
