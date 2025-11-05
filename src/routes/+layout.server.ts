import { loadTranslations, locales } from '$lib/translations';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, request, cookies }) => {
    const { pathname } = url;

    const defaultLocale = 'en';
    let locale = (cookies.get('lang') || '').toLowerCase();

    if (!locale) {
        // If no cookie is set, try to determine the locale from the 'Accept-Language' header
        const acceptLanguageHeader = request.headers.get('accept-language') || '';
        // Attempt to match the language code with optional region code
        let match = acceptLanguageHeader.match(/^[a-z]+(?=[-_])/i);

        // If no match is found, try to match just the language code
        if (!match) {
            match = acceptLanguageHeader.match(/^[a-z]+/i);
        }

        // If a match is found, use it as the locale, otherwise fall back to the default locale
        locale = match ? match[0].toLowerCase() : defaultLocale;
    }


    const supportedLocales = locales.get().map((l) => l.toLowerCase());

    if (!supportedLocales.includes(locale)) {
        locale = defaultLocale;
    }


    await loadTranslations(locale, pathname);
    return { locale };
}