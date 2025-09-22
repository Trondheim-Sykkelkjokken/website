import { LOG_SECRET, LOG_HOST } from '$env/static/private';

export function remoteLog(message: string, level = "INFO") {
    const payload = {
        message: `[${new Date().toISOString()}] [${level}] ${message}`,
        secret: LOG_SECRET
    };

    return fetch(LOG_HOST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(() => { }); // Optional: handle errors silently
}