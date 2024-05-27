
import { ENCRYPTION_KEY, INITIALIZATION_VECTOR } from '$env/static/private';


export async function encryptFormData(formData: FormData) {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const membershipType = formData.get("membershipType")?.toString();
    const id = formData.get("id")?.toString();
    const paymentType = formData.get("paymentType")?.toString();

    const json = JSON.stringify({ id, name, email, membershipType, paymentType });

    const encoder = new TextEncoder();
    const encryptionKey = encoder.encode(ENCRYPTION_KEY);
    const iv = encoder.encode(INITIALIZATION_VECTOR);
    const key = await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);

    const plainText = json;
    const encodedText = new TextEncoder().encode(plainText);

    let encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encodedText);
    let encryptedArray = new Uint8Array(encrypted);

    return encryptedArray
}

export async function decryptFormData(data: string) {
    const encoder = new TextEncoder();
    const encryptionKey = encoder.encode(ENCRYPTION_KEY);
    const iv = encoder.encode(INITIALIZATION_VECTOR);
    const key = await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    let encryptedArray = new Uint8Array(data.split(',').map(Number))
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encryptedArray);
    const decryptedString = new TextDecoder().decode(new Uint8Array(decrypted));
    const decryptedJson = JSON.parse(decryptedString);
    return decryptedJson;
}