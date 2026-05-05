/** @type {import('./$types').PageLoad} */
import { addPaymentDetailsToRegistration, updateEmailStatus } from '$lib/utils/googleSheets';
import { addPaymentDetailsToTurso, updateEmailStatusInTurso, tursoBestEffort } from '$lib/utils/turso';
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
            await Promise.all([
                addPaymentDetailsToRegistration(id, "payment cancelled or failed", PaymentType.CancelledOrFailed),
                tursoBestEffort(`registrationComplete/payment-failed/${id}`,
                    () => addPaymentDetailsToTurso(id, "payment cancelled or failed", PaymentType.CancelledOrFailed))
            ]);
            return { error: true }
        }

        //if the user reloads the landing page after the payment is captured, we don't want to capture the payment again
        const alreadyCaptured = paymentStatus.aggregate.capturedAmount.value !== 0;

        if (paymentStatus.state === 'AUTHORIZED' && !alreadyCaptured) {
            console.info(`Capturing payment for ${name} with id ${id}`);
            await capturePayment(id, amount, vippsToken.access_token);
            await Promise.all([
                addPaymentDetailsToRegistration(id, pspReference, paymentType, expiryDateDate),
                tursoBestEffort(`registrationComplete/payment/${id}`,
                    () => addPaymentDetailsToTurso(id, pspReference, paymentType, expiryDateDate))
            ]);

            let emailSent = false;
            try {
                await sendMail(email, name, expiryDateDate);
                emailSent = true;
            } catch (err: any) {
                console.error(`[registrationComplete] Failed to send email to ${email}: ${err.message}`);
            }
            await Promise.all([
                updateEmailStatus(id, emailSent),
                tursoBestEffort(`registrationComplete/email-status/${id}`,
                    () => updateEmailStatusInTurso(id, emailSent))
            ]);
        }

        return { name };

    }
    catch (error: any) {
        console.error(error.message)
        return { error: true }
    }
}

