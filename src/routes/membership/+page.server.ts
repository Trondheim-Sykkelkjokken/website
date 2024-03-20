/** @type {import('./$types').Actions} */
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { saveMemberToGoogleSheet } from '$lib/utils/googleSheets';
import { encryptFormData } from '$lib/utils/crypto';
import { PaymentType, getVippsAccessToken, initiateVippsPayment } from '$lib/utils/vipps';

export const prerender = false;


/*
* Read prices and membership types from config
* Add graphics to error page
* Integrate registeration to Fiken
* Proper logging
* Database?
*/


export const actions = {
    payWithVipps: async (event) => {
        const formData = await event.request.formData();
        formData.append("id", crypto.randomUUID());
        saveMemberToGoogleSheet(formData);
        const encryptedFormData = await encryptFormData(formData);

        let accessTokenResponse = await getVippsAccessToken();
        let accessToken = accessTokenResponse.access_token;

        let returnUrl = `${event.url.origin}/membership/registrationComplete?data=` + encryptedFormData;
        let payment = await initiateVippsPayment(accessToken, formData, returnUrl, PaymentType.Vipps);

        throw redirect(303, payment.redirectUrl);

    },
    payWithCard: async (event) => {
        const formData = await event.request.formData();
        formData.append("id", crypto.randomUUID());
        saveMemberToGoogleSheet(formData);
        const encryptedFormData = await encryptFormData(formData);

        let accessTokenResponse = await getVippsAccessToken();
        let accessToken = accessTokenResponse.access_token;

        let returnUrl = `${event.url.origin}/membership/registrationComplete?data=` + encryptedFormData;
        let payment = await initiateVippsPayment(accessToken, formData, returnUrl, PaymentType.Card)

        throw redirect(303, payment.redirectUrl);
    }
};
