/** @type {import('./$types').PageLoad} */
import { ENCRYPTION_KEY, INITIALIZATION_VECTOR } from '$env/static/private';
import { addPaymentDetailsToRegistration } from '$lib/utils/googleSheets';
import { decryptFormData } from '$lib/utils/crypto.js';

import { redirect } from '@sveltejs/kit';

export const prerender = false;

export async function load({ url }) {
    const encryptedData: string = url.searchParams.get('data');
    if (!encryptedData) {
        throw redirect(303, "/");
    }

    try {
        const decryptedJson = await decryptFormData(encryptedData);
        const { id, name, email, membershipType } = decryptedJson;
        await addPaymentDetailsToRegistration(id, name, email, membershipType);
    }
    catch (error) {
        console.error(error.message)
        return { error: true }
    }
}

