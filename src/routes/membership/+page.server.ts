/** @type {import('./$types').Actions} */
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { saveMemberToGoogleSheet } from '$lib/utils/googleSheets';
import { saveMemberToTurso, tursoBestEffort } from '$lib/utils/turso';
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

    // Sheets is authoritative during the dual-write phase; Turso is wrapped
    // in tursoBestEffort so its failures don't block the user from paying.
    await Promise.all([
        saveMemberToGoogleSheet(formData),
        tursoBestEffort('membership/pay', () => saveMemberToTurso(formData))
    ]);
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
