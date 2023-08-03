/** @type {import('./$types').Actions} */

import { saveMemberToGoogleSheet } from "$lib/utils/googleSheets";

// @ts-ignore
const prices = { year: 330, year_reduced: 220, semester: 215, semester_reduced: 150 };


export const actions = {
    payWithVipps: async (event) => {
        console.log("paying with vipps");
        const formData = await event.request.formData();
        const name = formData.get("name").toString();
        const email = formData.get("email").toString();
        const membershipType = formData.get("membershipType").toString();



        try {
            await saveMemberToGoogleSheet(name, email, membershipType);
            return { success: true, error: false };

        } catch (e) {
            console.error(e)
            return { success: false, error: true };
        }



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

