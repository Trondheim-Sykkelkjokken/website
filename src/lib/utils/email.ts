import { GOOGLE_GMAIL_CLIENT_ID, GOOGLE_GMAIL_SECRET, GOOGLE_GMAIL_REFRESH_TOKEN, SIGNAL_GROUP_URL } from '$env/static/private';
import { t, locale } from '$lib/translations';

async function getAccessToken(): Promise<string> {
    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: GOOGLE_GMAIL_CLIENT_ID,
            client_secret: GOOGLE_GMAIL_SECRET,
            refresh_token: GOOGLE_GMAIL_REFRESH_TOKEN,
            grant_type: 'refresh_token'
        })
    });
    if (!res.ok) {
        throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
    }
    return (await res.json()).access_token;
}

async function sendRawMessage(raw: string) {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw })
    });
    if (!res.ok) {
        throw new Error(`Gmail send failed: ${res.status} ${await res.text()}`);
    }
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
            await sendRawMessage(rawMessage);
            console.info(`[sendMail] Message sent to ${address}`);
            return;
        } catch (err) {
            console.error(`[sendMail] Attempt ${attempt + 1}/${MAX_RETRIES + 1} failed:`, err);
            if (attempt === MAX_RETRIES) {
                throw err;
            }
            // Back off between attempts: the failures worth retrying here are
            // Gmail rate limits and 5xx, which an immediate resend just hits again.
            await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
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
