import { google } from "googleapis";
import { GOOGLE_SHEETS_KEY, GOOGLE_SHEETS_EMAIL, GOOGLE_SHEETS_ID } from '$env/static/private';

export async function saveMemberToGoogleSheet(name: string, email: string, membershipType: string) {
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
        [name, email, membershipType, new Date()]
    ];

    const body = {
        values: data,
    };

    sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range: "raw_data!A2:D2",
        valueInputOption: "RAW",
        resource: body
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
        } else {
            console.log(response);
        }
    });

}

