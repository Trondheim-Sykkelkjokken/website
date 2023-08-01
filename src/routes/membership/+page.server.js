/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const name = formData.get("name");
        const email = formData.get("email");

        console.log(formData);

        return { success: true, error: false };
    }
};