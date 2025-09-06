import { GOOGLE_GMAIL_CLIENT_ID, GOOGLE_GMAIL_SECRET, GOOGLE_GMAIL_REFRESH_TOKEN, GOOGLE_GMAIL_REDIRECT_URI, SIGNAL_GROUP_URL } from '$env/static/private';
import { google } from "googleapis";
import { t, locale } from '$lib/translations';

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_GMAIL_CLIENT_ID,
    GOOGLE_GMAIL_SECRET,
    GOOGLE_GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_GMAIL_REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export async function sendMail(address: string, name: string, expiryDate: Date) {
    const subject = t.get('email.subject');

    const formatedExpiryDate = formatDate(expiryDate, locale.get());

    const body: string = t.get('email.bodyText')
        .replace("{name}", name)
        .replace("{expiry}", formatedExpiryDate)
        .replace("{signal_url}", SIGNAL_GROUP_URL);

    const senderName = "Trondheim sykkelkjøkken";
    const encodedSenderName = `=?UTF-8?B?${Buffer.from(senderName, 'utf8').toString('base64')}?=`;

    const rawMessage = Buffer.from(
        `To: ${address}\r\n` +
        `From: ${encodedSenderName} <kontakt@sykkelkjokken.no>\r\n` +
        `Reply-To: kontakt@sykkelkjokken.no\r\n` +
        `Subject: =?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=\r\n` +
        `Content-Type: text/html; charset=UTF-8\r\n` +
        `Content-Transfer-Encoding: base64\r\n\r\n` +
        Buffer.from(body, 'utf8').toString('base64')
    ).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, "");

    const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: rawMessage },
    });

    console.log("Message sent:", res.data);
}

function formatDate(date: Date, locale: string) {
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long", // "January" / "Januar" / "Janvier" depending on locale
        year: "numeric"
    }).format(date);
}
