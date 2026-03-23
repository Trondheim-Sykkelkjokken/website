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

    sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range,
        valueInputOption: "RAW",
        resource: body
    }, function (err) {
        if (err) {
            console.error(`[saveMemberToGoogleSheet] The Google Sheets API returned an error: ${err}`);
        }
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
        // Update the sheet
        sheets.spreadsheets.values.update({
            auth: jwtClient,
            spreadsheetId: GOOGLE_SHEETS_ID,
            range: `raw_data!A${rows.indexOf(row) + 1}:Z${rows.indexOf(row) + 1}`, // Replace with the range of the row you want to update
            valueInputOption: 'RAW',
            resource: {
                values: [row],
            },
        });

    } else {
        console.error('[addPaymentDetailsToRegistration] No row found with the given ID');
    }
}