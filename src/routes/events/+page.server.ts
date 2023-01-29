import { FB_ACCESS_TOKEN } from '$env/static/private';

let url = `https://graph.facebook.com/v15.0/trondheim-sykkelkjokken?fields=events&client_access_token=${FB_ACCESS_TOKEN}&appId=970802187419117`

console.log(FB_ACCESS_TOKEN)


/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(url);
    const item = await res.json();
    return item
}