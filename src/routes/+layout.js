import { loadTranslations } from "$lib/translations";

export const prerender = false;


/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, data }) => {
    const { pathname } = url;
    const locale = data?.locale || 'en';

    await loadTranslations(locale, pathname);
    return {};
}