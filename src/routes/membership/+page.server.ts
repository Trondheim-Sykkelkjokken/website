/** @type {import('./$types').Actions} */
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { saveMemberToTurso } from '$lib/utils/turso';
import { encryptFormData } from '$lib/utils/crypto';
import { PaymentType, getVippsAccessToken, initiateVippsPayment } from '$lib/utils/vipps';
import { calculateExpiryDate } from '$lib/utils/memberships.js';
import type { RouteParams } from '../$types';

async function pay(event: RequestEvent<RouteParams, "/membership">, paymentType: PaymentType) {
    const formData = await event.request.formData();
    formData.append("id", crypto.randomUUID());
    formData.append("paymentType", paymentType);

    let expiryDate = calculateExpiryDate(formData.get("membershipType") as string);
    formData.append("expiryDate", expiryDate.toISOString());

    // Store the registration before sending the user to Vipps. A failed write
    // throws here, so we never take a payment we have no record of.
    await saveMemberToTurso(formData);
    const encryptedFormData = await encryptFormData(formData);

    let accessTokenResponse = await getVippsAccessToken();
    let accessToken = accessTokenResponse.access_token;

    let returnUrl = `${event.url.origin}/membership/registrationComplete?data=` + encryptedFormData;
    let payment = await initiateVippsPayment(accessToken, formData, returnUrl, paymentType);

    return payment;


}

export const actions = {
    payWithVipps: async (event) => {
        let payment = await pay(event, PaymentType.Vipps);
        throw redirect(303, payment.redirectUrl);
    },

    payWithCard: async (event) => {
        let payment = await pay(event, PaymentType.Card);
        throw redirect(303, payment.redirectUrl);
    }
};
