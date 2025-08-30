import lang from '../translations/lang.json';
type LanguageCode = keyof typeof lang;

import { google } from "googleapis";
import { t } from '$lib/translations';


import { GOOGLE_GMAIL_CLIENT_ID, GOOGLE_GMAIL_SECRET, GOOGLE_GMAIL_REFRESH_TOKEN, GOOGLE_GMAIL_REDIRECT_URI } from '$env/static/private';


// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_GMAIL_CLIENT_ID,
    GOOGLE_GMAIL_SECRET,
    GOOGLE_GMAIL_REDIRECT_URI
);

// Set refresh token
oAuth2Client.setCredentials({ refresh_token: GOOGLE_GMAIL_REFRESH_TOKEN });

// Gmail instance
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// Helper to send
export async function sendMail(address: string, name: string) {
    const subject = t.get('email.subject');
    console.log(subject);
    const body = `Welcome, ${name}. \r\nWe have registred your membership! If you have any questions, you can reply to this email. Ride safe!`;
    const rawMessage = Buffer.from(
        `To: ${address}\r\n` +
        `From: kontakt@sykkelkjokken.no\r\n` +
        `Reply-To: kontakt@sykkelkjokken.no\r\n` +
        `Subject: ${subject}\r\n\r\n` +
        body
    ).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, "");

    const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: rawMessage },
    });

    console.log("Message sent:", res.data);
}
