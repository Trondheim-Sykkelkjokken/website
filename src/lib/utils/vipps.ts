import { VIPPS_CLIENT_ID, VIPPS_CLIENT_SECRET, VIPPS_OCP_APIM_SUBSCRIPTION_KEY, VIPPS_MSN, VIPPS_BASE_URL } from '$env/static/private';
//TODO: Read this from config
const prices: { [key: string]: number } = { "year": 330, "year-reduced": 220, "semester": 215, "semester-reduced": 150 };

export enum PaymentType {
    Vipps = "WALLET",
    Card = "CARD"

}

export async function getVippsAccessToken() {
    const url = `${VIPPS_BASE_URL}/accesstoken/get`;
    const headers = {
        "Content-Type": "application/json",
        "client_id": VIPPS_CLIENT_ID,
        "client_secret": VIPPS_CLIENT_SECRET,
        "Ocp-Apim-Subscription-Key": VIPPS_OCP_APIM_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": VIPPS_MSN,
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

export async function initiateVippsPayment(accessToken: string, formData: FormData, returnUrl: string, paymentType: PaymentType) {
    const url = `${VIPPS_BASE_URL}/epayment/v1/payments`;

    const idempotencyKey = formData.get("id") as string;
    const membershipType = formData.get("membershipType") as string;
    //we multiply by 100 to convert from nok to øre
    const price = prices[membershipType] * 100;
    console.log(formData);


    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": VIPPS_OCP_APIM_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": VIPPS_MSN,
        "Idempotency-Key": idempotencyKey,
    };

    const body = {
        amount: {
            currency: "NOK",
            value: price
        },
        paymentMethod: {
            type: paymentType
        },
        customer: {
            email: formData.get("email") as string,
        },
        reference: idempotencyKey,
        returnUrl: returnUrl,
        userFlow: "WEB_REDIRECT",
        paymentDescription: "Medlemsskap Trondheim sykkelkjøkken"
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        try {
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log('Response is not JSON');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
}

export async function getPaymentStatus(paymentReference: string, accessToken: string) {
    const url = `${VIPPS_BASE_URL}/epayment/v1/payments/${paymentReference}`;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": VIPPS_OCP_APIM_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": VIPPS_MSN,

    };

    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function capturePayment(paymentReference: string, amount: number, accessToken: string) {
    const url = `${VIPPS_BASE_URL}/epayment/v1/payments/${paymentReference}/capture`;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": VIPPS_OCP_APIM_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": VIPPS_MSN,
        "Idempotency-Key": paymentReference,
    };

    const body = {
        "modificationAmount": {
            "currency": "NOK",
            "value": amount
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const responseData = await response.json();

        console.log(responseData);

        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();

    console.log(responseData);

    return responseData;
}