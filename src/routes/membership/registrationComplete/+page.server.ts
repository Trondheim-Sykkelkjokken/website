/** @type {import('./$types').PageLoad} */


export async function load({ url }) {

    const keyString = 'encryption key';
    const encoder = new TextEncoder();
    const encryptionKey = encoder.encode(keyString);

    const ivString = 'initialization vector';
    const iv = encoder.encode(ivString);

    const key = await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);


    let data: string = url.searchParams.get('data');
    let encryptedArray = [];

    //const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encryptedArray);
    //const decryptedString = new TextDecoder().decode(new Uint8Array(decrypted));

}