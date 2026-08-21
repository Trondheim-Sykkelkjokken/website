import { GOOGLE_GMAIL_CLIENT_ID, GOOGLE_GMAIL_SECRET, GOOGLE_GMAIL_REFRESH_TOKEN, GOOGLE_GMAIL_REDIRECT_URI, SIGNAL_GROUP_URL } from '$env/static/private';
import { google } from "googleapis";
import { t, locale } from '$lib/translations';

function createGmailClient() {
    const oAuth2Client = new google.auth.OAuth2(
        GOOGLE_GMAIL_CLIENT_ID,
        GOOGLE_GMAIL_SECRET,
        GOOGLE_GMAIL_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: GOOGLE_GMAIL_REFRESH_TOKEN });
    return google.gmail({ version: "v1", auth: oAuth2Client });
}

const MAX_RETRIES = 2;

export async function sendMail(address: string, name: string, expiryDate: Date) {
    const subject = t.get('email.subject');
    const formatedExpiryDate = formatDate(expiryDate, locale.get());
    const bodyText = t.get('email.bodyText')
        .replace("{name}", name)
        .replace("{expiry}", formatedExpiryDate)
        .replace("{signal_url}", SIGNAL_GROUP_URL);
    const websiteLinkText = t.get('email.websiteLinkText');
    const body = wrapEmailHtml(subject, bodyText, websiteLinkText);
    const senderName = "Trondheim sykkelkjøkken";
    const rawMessage = Buffer.from(
        `To: ${address}\r\n` +
        `From: ${encodeMimeWord(senderName)} <kontakt@sykkelkjokken.no>\r\n` +
        `Reply-To: kontakt@sykkelkjokken.no\r\n` +
        `Subject: ${encodeMimeWord(subject)}\r\n` +
        `Content-Type: text/html; charset=UTF-8\r\n` +
        `Content-Transfer-Encoding: base64\r\n\r\n` +
        Buffer.from(body, 'utf8').toString('base64')
    ).toString("base64url");

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const gmail = createGmailClient();
            await gmail.users.messages.send({
                userId: "me",
                requestBody: { raw: rawMessage },
            });
            console.info(`[sendMail] Message sent to ${address}`);
            return;
        } catch (err) {
            console.error(`[sendMail] Attempt ${attempt + 1}/${MAX_RETRIES + 1} failed:`, err);
            if (attempt === MAX_RETRIES) {
                throw err;
            }
        }
    }
}

function wrapEmailHtml(title: string, bodyText: string, websiteLinkText: string) {
    return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0;">
<table role="presentation" align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; margin:0 auto; font-family:Arial, Helvetica, sans-serif;">
<tr><td style="padding:24px 16px; font-size:15px; line-height:1.6; color:#2b2b2b;">
<img src="https://sykkelkjokken.no/hjerte-email.png" alt="" width="192" style="display:block; margin:0 auto 16px; width:192px; max-width:48%; height:auto;">
<h1 style="margin:0 0 12px; font-size:20px;">${title}</h1>
${bodyText}
<p style="margin:16px 0 0;"><a href="https://sykkelkjokken.no">${websiteLinkText}</a></p>
</td></tr>
</table>
</body>
</html>`;
}

function encodeMimeWord(text: string) {
    return `=?UTF-8?B?${Buffer.from(text, 'utf8').toString('base64')}?=`;
}

function formatDate(date: Date, locale: string) {
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long", // "January" / "Januar" / "Janvier" depending on locale
        year: "numeric"
    }).format(date);
}
