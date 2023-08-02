import { google } from "googleapis";
import { GOOGLE_SHEETS_KEY, GOOGLE_SHEETS_EMAIL, GOOGLE_SHEETS_ID } from '$env/static/private';

export function foo() {
    let jwtClient = new google.auth.JWT(
        GOOGLE_SHEETS_EMAIL,
        null,
        GOOGLE_SHEETS_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']);
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successfully connected to Google Sheets API!");
        }
    });
    //Google Sheets API
    let spreadsheetId = GOOGLE_SHEETS_ID;
    let sheets = google.sheets('v4');
    let values = [
        [
            1, 2, 3
        ],
    ];
    const body = {
        values: values,
    };

    sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: "A1:C1",
        valueInputOption: "RAW",
        resource: body
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
        } else {
            console.log('Wat:');
            for (let row of response.values) {
                console.log('Title [%s]\t\tRating [%s]', row[0], row[1]);
            }
        }
    });

}

