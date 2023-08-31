/** @type {import('./$types').PageLoad} */
import { ENCRYPTION_KEY, INITIALIZATION_VECTOR } from '$env/static/private';
import { saveMemberToGoogleSheet } from '$lib/utils/googleSheets';
import { redirect } from '@sveltejs/kit';

async function decryptFormData(data) {
    const encoder = new TextEncoder();
    const encryptionKey = encoder.encode(ENCRYPTION_KEY);
    const iv = encoder.encode(INITIALIZATION_VECTOR);
    const key = await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    let encryptedArray = new Uint8Array(data.split(',').map(Number))
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encryptedArray);
    const decryptedString = new TextDecoder().decode(new Uint8Array(decrypted));
    const decryptedJson = JSON.parse(decryptedString);
    return decryptedJson;
}

export async function load({ url }) {
    const encryptedData: string = url.searchParams.get('data');
    if (!encryptedData) {
        throw redirect(303, "/");
    }

    try {
        const decryptedJson = await decryptFormData(encryptedData);
        const { id, name, email, membershipType } = decryptedJson;
        await saveMemberToGoogleSheet(id, name, email, membershipType);
    }
    catch (error) {
        console.error(error.message)
        return { error: true }
    }
}