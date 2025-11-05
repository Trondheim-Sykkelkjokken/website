import { loadTranslations } from "$lib/translations";
import type { LayoutLoad } from "./$types";

export const prerender = false;

export const load: LayoutLoad = async ({ url, data }) => {
    const { pathname } = url;
    const locale = data?.locale || 'en';

    await loadTranslations(locale, pathname);
    return {};
}