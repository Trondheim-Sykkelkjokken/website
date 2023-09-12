import { google } from "googleapis";
import { GOOGLE_SHEETS_KEY, GOOGLE_SHEETS_EMAIL, GOOGLE_SHEETS_ID } from '$env/static/private';

export async function saveMemberToGoogleSheet(id: string, name: string, email: string, membershipType: string) {
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

    // Check if data already exists
    const range = "raw_data!A:E";
    const existingData = await sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range,
    });

    if (existingData) {
        const existingValues = existingData.data.values;

        // Check if data already exists in the spreadsheet based on the ID field
        const exists = existingValues.some((row) => {
            const [existingId] = row;
            return existingId === id;
        });

        // Skip append if data already exists
        if (exists) {
            console.log("Data already exists in spreadsheet");
            return;
        }
    }

    sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: GOOGLE_SHEETS_ID,
        range,
        valueInputOption: "RAW",
        resource: body
    }, function (err, response) {
        if (err) {
            console.log('The Google Sheets API returned an error: ' + err);
        } else {
            console.log('Data saved to google sheet: ' + data);
        }
    });

}


export async function addPaymentDetailsToRegistration(id: number) {
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

    // Check if data already exists
    const range = "raw_data!A:E";
    
    const response = await sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: GOOGLE_SHEETS_ID,
      range
    });

    const rows = response.data.values;

    // Find the row with the given ID
    const row = rows.find((row) => row[0] === id.toString());

    if (row) {
      // Append payment details to the end of the row
      row.push('payment details'); // Replace 'payment details' with the actual payment details

      // Update the sheet
      await sheets.spreadsheets.values.update({
        auth: jwtClient,
        spreadsheetId,
        range: `${sheetName}!A${rows.indexOf(row) + 1}:Z${rows.indexOf(row) + 1}`, // Replace with the range of the row you want to update
        valueInputOption: 'RAW',
        resource: {
          values: [row],
        },
      });

      console.log('Payment details added to row:', row);

    } else {
      console.log('No row found with the given ID');
    }
}