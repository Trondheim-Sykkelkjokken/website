/** @type {import('./$types').PageLoad} */
import { addPaymentDetailsToTurso, updateEmailStatusInTurso } from '$lib/utils/turso';
import { decryptFormData } from '$lib/utils/crypto.js';
import { redirect } from '@sveltejs/kit';
import { getVippsAccessToken, getPaymentStatus, capturePayment, PaymentType } from '$lib/utils/vipps';
import { sendMail } from '$lib/utils/email';

export async function load({ url }) {
    const encryptedData: string | null = url.searchParams.get('data');

    if (!encryptedData) {
        redirect(303, "/");
    }

    try {
        const decryptedJson = await decryptFormData(encryptedData);
        const { id, name, paymentType, expiryDate, email } = decryptedJson;
        const vippsToken = await getVippsAccessToken();
        const paymentStatus = await getPaymentStatus(id, vippsToken.access_token);
        const pspReference = paymentStatus.pspReference;
        const amount = paymentStatus.amount.value;
        let expiryDateDate = new Date(expiryDate);

        if (paymentStatus.state !== 'AUTHORIZED') {
            console.error(`Payment ${id} for ${name} cancelled or failed.`);
            await addPaymentDetailsToTurso(id, "payment cancelled or failed", PaymentType.CancelledOrFailed);
            return { error: true }
        }

        //if the user reloads the landing page after the payment is captured, we don't want to capture the payment again
        const alreadyCaptured = paymentStatus.aggregate.capturedAmount.value !== 0;

        if (paymentStatus.state === 'AUTHORIZED' && !alreadyCaptured) {
            console.info(`Capturing payment for ${name} with id ${id}`);
            await capturePayment(id, amount, vippsToken.access_token);
            // Store the payment before telling the member they have a
            // membership: a failed write throws, so the confirmation email is
            // never sent for a membership we have no record of.
            await addPaymentDetailsToTurso(id, pspReference, paymentType, expiryDateDate);

            let emailSent = false;
            try {
                await sendMail(email, name, expiryDateDate);
                emailSent = true;
            } catch (err: any) {
                console.error(`[registrationComplete] Failed to send email to ${email}: ${err.message}`);
            }
            // The membership is already stored and the member already told, so
            // a failure to record the email flag must not fail the page.
            try {
                await updateEmailStatusInTurso(id, emailSent);
            } catch (err: any) {
                console.error(`[registrationComplete] Failed to record email status for ${id}: ${err.message}`);
            }
        }

        return { name };

    }
    catch (error: any) {
        console.error(error.message)
        return { error: true }
    }
}

