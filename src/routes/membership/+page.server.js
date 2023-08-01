/** @type {import('./$types').Actions} */

// @ts-ignore
const prices = { year: 330, year_reduced: 220, semester: 215, semester_reduced: 150 };


export const actions = {
    payWithVipps: async (event) => {
        console.log("paying with vipps");
        const formData = await event.request.formData();
        const name = formData.get("name");
        const email = formData.get("email");

        console.log(formData);

        return { success: true, error: false };
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

