/** @type {import('./$types').PageLoad} */
import { addPaymentDetailsToRegistration } from '$lib/utils/googleSheets';
import { decryptFormData } from '$lib/utils/crypto.js';

import { redirect } from '@sveltejs/kit';
import { getVippsAccessToken, getPaymentStatus, capturePayment, PaymentType } from '$lib/utils/vipps';

export const prerender = false;

export async function load({ url }) {
    const encryptedData: string | null = url.searchParams.get('data');

    if (!encryptedData) {
        redirect(303, "/");
    }

    try {
        const decryptedJson = await decryptFormData(encryptedData);
        const { id, name, paymentType, expiryDate } = decryptedJson;
        const vippsToken = await getVippsAccessToken();
        const paymentStatus = await getPaymentStatus(id, vippsToken.access_token);
        const pspReference = paymentStatus.pspReference;
        const amount = paymentStatus.amount.value;
        let expiryDateDate = new Date(expiryDate);

        if (paymentStatus.state !== 'AUTHORIZED') {
            console.error(`Payment ${id} for ${name} cancelled or failed.`)
            await addPaymentDetailsToRegistration(id, "payment cancelled or failed", PaymentType.CancelledOrFailed);
            return { error: true }
        }

        //if the user reloads the landing page after the payment is captured, we don't want to capture the payment again
        const alreadyCaptured = paymentStatus.aggregate.capturedAmount.value !== 0;

        if (paymentStatus.state === 'AUTHORIZED' && !alreadyCaptured) {
            // We give Vipps a few seconds to process the payment
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.info(`Capturing payment for ${name} with id ${id}`);
            await capturePayment(id, amount, vippsToken.access_token);
            await addPaymentDetailsToRegistration(id, pspReference, paymentType, expiryDateDate);
        }

        return { name };

    }
    catch (error: any) {
        console.error(error.message)
        return { error: true }
    }
}

