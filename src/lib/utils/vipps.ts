import fetch from 'node-fetch';

import { VIPPS_CLIENT_ID, VIPPS_CLIENT_SECRET, VIPPS_OCP_APIM_SUBSCRIPTION_KEY, VIPPS_MSN } from '$env/static/private';


export async function getVippsAccessToken() {
    const url = 'https://apitest.vipps.no/accesstoken/get';
    const headers = {
        "Content-Type": "application/json",
        "client_id": VIPPS_CLIENT_ID,
        "client_secret": VIPPS_CLIENT_SECRET,
        "Ocp-Apim-Subscription-Key": VIPPS_OCP_APIM_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": VIPPS_MSN,
        "Vipps-System-Name": "Trondheim sykkelkjøkken",
        "Vipps-System-Version": "3.1.2",
        "Vipps-System-Plugin-Name": "Trohdeim sykkelkjøkken - Website",
        "Vipps-System-Plugin-Version": "4.5.6"
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({})
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function initiateVippsPayment(accessToken: string, formData: FormData) {
    const url = 'https://apitest.vipps.no/epayment/v1/payments';
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": VIPPS_OCP_APIM_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": VIPPS_MSN,
        "Idempotency-Key": "YOUR-IDEMPOTENCY-KEY",
        "Vipps-System-Name": "Trondheim sykkelkjøkken",
        "Vipps-System-Version": "3.1.2",
        "Vipps-System-Plugin-Name": "Trohdeim sykkelkjøkken - Website",
        "Vipps-System-Plugin-Version": "4.5.6"
    };

    const body = {
        amount: {
            currency: "NOK",
            value: 1000
        },
        paymentMethod: {
            type: "WALLET"
        },
        customer: {
            phoneNumber: "4791234567"
        },
        reference: "acme-shop-123-order123abc",
        returnUrl: "https://yourwebsite.come/redirect?reference=abcc123",
        userFlow: "WEB_REDIRECT",
        paymentDescription: "One pair of socks"
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}