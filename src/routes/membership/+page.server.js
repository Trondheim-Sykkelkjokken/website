/** @type {import('./$types').Actions} */
import { redirect } from '@sveltejs/kit';
import { ENCRYPTION_KEY, INITIALIZATION_VECTOR } from '$env/static/private';


import { saveMemberToGoogleSheet } from "$lib/utils/googleSheets";

// @ts-ignore
const prices = { year: 330, year_reduced: 220, semester: 215, semester_reduced: 150 };






async function encryptFormData(formData) {
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const membershipType = formData.get("membershipType").toString();

    const json = JSON.stringify({ name, email, membershipType });

    const encoder = new TextEncoder();
    const encryptionKey = encoder.encode(ENCRYPTION_KEY);
    const iv = encoder.encode(INITIALIZATION_VECTOR);
    const key = await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);

    const plainText = json;
    const encodedText = new TextEncoder().encode(plainText);

    let encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encodedText);
    let encryptedArray = new Uint8Array(encrypted);

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

