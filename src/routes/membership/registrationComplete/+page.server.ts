/** @type {import('./$types').PageLoad} */
import { addPaymentDetailsToRegistration } from '$lib/utils/googleSheets';
import { decryptFormData } from '$lib/utils/crypto.js';

import { redirect } from '@sveltejs/kit';
import { getVippsAccessToken, getPaymentStatus, capturePayment } from '$lib/utils/vipps';

export const prerender = false;

export async function load({ url }) {
    const encryptedData: string | null = url.searchParams.get('data');

    if (!encryptedData) {
        throw redirect(303, "/");
    }

    try {
        const decryptedJson = await decryptFormData(encryptedData);
        const { id, name, email, membershipType } = decryptedJson;

        const vippsToken = await getVippsAccessToken();
        const paymentStatus = await getPaymentStatus(id, vippsToken.access_token);
        const pspReference = paymentStatus.pspReference;
        const amount = paymentStatus.amount.value;


        if (paymentStatus.state !== 'AUTHORIZED') {
            return { error: true }
        }

        if (paymentStatus.state === 'AUTHORIZED') {
            await capturePayment(id, amount, vippsToken.access_token);
        }

        await addPaymentDetailsToRegistration(id, pspReference);
    }
    catch (error: any) {
        console.error(error.message)
        return { error: true }
    }
}

