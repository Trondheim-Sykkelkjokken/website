import { google } from "googleapis";
import { GOOGLE_SHEETS_KEY, GOOGLE_SHEETS_EMAIL, GOOGLE_SHEETS_ID } from '$env/static/private';
import type { PaymentType } from "./vipps";

export async function saveMemberToGoogleSheet(formData: FormData) {
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const membershipType = formData.get("membershipType").toString();
    const id = formData.get("id").toString();

    let jwtClient = new google.auth.JWT(
        GOOGLE_SHEETS_EMAIL,
        null,
        GOOGLE_SHEETS_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']);


    // authenticate request
    try {
        await jwtClient.authorize();
    } catch (e) {
        console.error("Unable to authorize against google API")
        console.error(e.message);
        throw e.message;
    }

    //Google Sheets API
    let sheets = google.sheets('v4');

    let data = [
        [id, name, email, membershipType, new Date()]
    ];

    const body = {
        values: data,
    };

    const range = "raw_data!A:E";

    await sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range,
        valueInputOption: "RAW",
        requestBody: body
    });

}


export async function addPaymentDetailsToRegistration(id: number, pspReference: string, paymentType: PaymentType, expiryDate?: Date) {
    let jwtClient = new google.auth.JWT(
        GOOGLE_SHEETS_EMAIL,
        undefined,
        GOOGLE_SHEETS_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']);


    // authenticate request
    try {
        await jwtClient.authorize();
    } catch (e: any) {
        console.error("[addPaymentDetailsToRegistration] Unable to authorize against google API");
        throw e.message;
    }

    //Google Sheets API
    let sheets = google.sheets('v4');

    // Check if data already exists
    const range = "raw_data!A:E";

    const response = await sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range
    });

    const rows = response.data.values;

    if (!rows) {
        console.error('[addPaymentDetailsToRegistration] No rows returned from the Google Sheets API');
        return;
    }

    // Find the row with the given ID
    const row = rows.find((row) => row[0] === id.toString());

    if (row) {
        row.push(pspReference);
        row.push(new Date().toLocaleDateString('nb-NO'));
        row.push(paymentType);
        if (expiryDate) {
            row.push(expiryDate.toLocaleDateString('nb-NO'));
        }
        await sheets.spreadsheets.values.update({
            auth: jwtClient,
            spreadsheetId: GOOGLE_SHEETS_ID,
            range: `raw_data!A${rows.indexOf(row) + 1}:Z${rows.indexOf(row) + 1}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [row],
            },
        });

    } else {
        console.error('[addPaymentDetailsToRegistration] No row found with the given ID');
    }
}

export async function updateEmailStatus(id: string, sent: boolean) {
    let jwtClient = new google.auth.JWT(
        GOOGLE_SHEETS_EMAIL,
        undefined,
        GOOGLE_SHEETS_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']);

    try {
        await jwtClient.authorize();
    } catch (e: any) {
        console.error("[updateEmailStatus] Unable to authorize against google API");
        throw e.message;
    }

    let sheets = google.sheets('v4');

    const range = "raw_data!A:Z";

    const response = await sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range
    });

    const rows = response.data.values;

    if (!rows) {
        console.error('[updateEmailStatus] No rows returned from the Google Sheets API');
        return;
    }

    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex !== -1) {
        const row = rows[rowIndex];
        row.push(sent ? "TRUE" : "FALSE");
        await sheets.spreadsheets.values.update({
            auth: jwtClient,
            spreadsheetId: GOOGLE_SHEETS_ID,
            range: `raw_data!A${rowIndex + 1}:Z${rowIndex + 1}`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [row],
            },
        });
    } else {
        console.error('[updateEmailStatus] No row found with the given ID');
    }
}