import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
    fallbackLocale: 'en',
    log: {
        level: dev ? 'warn' : 'error',
    },
    translations: {
        en: { lang },
        no: { lang },
    },
    loaders: [
        {
            locale: 'en',
            key: 'layout',
            loader: async () => (await import('../../content/translations/en/layout.json')).default,
        },
        {
            locale: 'no',
            key: 'layout',
            loader: async () => (await import('../../content/translations/no/layout.json')).default,
        },
        {
            locale: 'en',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../content/translations/en/home.json')).default,
        },
        {
            locale: 'no',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../content/translations/no/home.json')).default,
        },
        {
            locale: 'en',
            key: 'membership',
            routes: ['/membership'],
            loader: async () => (await import('../../content/translations/en/membership.json')).default,
        },
        {
            locale: 'no',
            key: 'membership',
            routes: ['/membership'],
            loader: async () => (await import('../../content/translations/no/membership.json')).default,
        },
        {
            locale: 'en',
            key: 'volunteer',
            routes: ['/volunteer'],
            loader: async () => (await import('../../content/translations/en/volunteer.json')).default,
        },
        {
            locale: 'no',
            key: 'volunteer',
            routes: ['/volunteer'],
            loader: async () => (await import('../../content/translations/no/volunteer.json')).default,
        },
        {
            locale: 'en',
            key: 'events',
            routes: ['/events'],
            loader: async () => (await import('../../content/translations/en/events.json')).default,
        },
        {
            locale: 'no',
            key: 'events',
            routes: ['/events'],
            loader: async () => (await import('../../content/translations/no/events.json')).default,
        },
    ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));