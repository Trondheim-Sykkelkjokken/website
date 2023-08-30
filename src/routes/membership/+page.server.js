/** @type {import('./$types').Actions} */
import { redirect } from '@sveltejs/kit';

import { saveMemberToGoogleSheet } from "$lib/utils/googleSheets";

// @ts-ignore
const prices = { year: 330, year_reduced: 220, semester: 215, semester_reduced: 150 };






async function encryptFormData(formData) {
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const membershipType = formData.get("membershipType").toString();

    const json = JSON.stringify({ name, email, membershipType });

    const keyString = 'KVCQmXAVJ+9HMahKlkTSfvZjbp2jTxicOgsm78stidH76PjAtMewQnVmAR4r2abD';
    const encoder = new TextEncoder();
    const encryptionKey = encoder.encode(keyString);

    const ivString = 'initialization vector';
    const iv = encoder.encode(ivString);


    // Generate a random encryption key


    // Convert the string to be encrypted into a Uint8Array
    const plainText = json;
    const encodedText = new TextEncoder().encode(plainText);

    const key = await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);


    // Encrypt the string using the encryption key
    let encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encodedText);

    let encryptedArray = new Uint8Array(encrypted);

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encryptedArray);
    const decryptedString = new TextDecoder().decode(new Uint8Array(decrypted));

    console.log("Decrypted: " + decryptedString);

    return encryptedArray
}


export const actions = {
    payWithVipps: async (event) => {
        console.log("paying with vipps");
        const formData = await event.request.formData();
        const encryptedFormData = await encryptFormData(formData);


        //TODO: Create payment at Vipps and redirect to URL
        throw redirect(303, `https://cruel-week.surge.sh/?url=http://localhost:5173/membership/registrationComplete?data=${encryptedFormData}`);

        //TODO: move this to redirect endpoint
        // try {
        //     await saveMemberToGoogleSheet(name, email, membershipType);
        //     return { success: true, error: false };

        // } catch (e) {
        //     console.error("Unable to save membership to Google Sheet")
        //     return { success: false, error: true };
        // }



    },
    payWithCard: async (event) => {
        console.log("paying with card")
        return { success: true, error: false };
    }
};

export function load({ params }) {

    return {
        prices
    };
}

