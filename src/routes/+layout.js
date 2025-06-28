import { loadTranslations } from "$lib/translations";

// I am not really sure this actually does anything
export const prerender = true;


/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, data }) => {
    const { pathname } = url;

    console.log("locale from server: " + data?.locale);

    const locale = data?.locale || 'en';

    await loadTranslations(locale, pathname);
    return {};
}