/** @type {import('./$types').Actions} */
import { redirect } from '@sveltejs/kit';
import { saveMemberToGoogleSheet } from '$lib/utils/googleSheets';

import { encryptFormData } from '$lib/utils/crypto';

export const prerender = false;

// @ts-ignore
const prices = { year: 330, year_reduced: 220, semester: 215, semester_reduced: 150 };


export const actions = {
    payWithVipps: async (event) => {
        const formData = await event.request.formData();
        formData.append("id", crypto.randomUUID());
        saveMemberToGoogleSheet(formData);
        const encryptedFormData = await encryptFormData(formData);


        //TODO: Create payment at Vipps and redirect to URL
        throw redirect(303, `https://cruel-week.surge.sh/?url=http://localhost:5173/membership/registrationComplete?data=${encryptedFormData}`);

    },
    payWithCard: async (event) => {
        const formData = await event.request.formData();
        formData.append("id", crypto.randomUUID());
        const encryptedFormData = await encryptFormData(formData);


        //TODO: Create payment at Vipps and redirect to URL
        throw redirect(303, `https://cruel-week.surge.sh/?url=http://localhost:5173/membership/registrationComplete?data=${encryptedFormData}`);
    }
};

export function load({ params }) {

    return {
        prices
    };
}

