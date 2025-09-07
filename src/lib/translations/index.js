import { dev } from '$app/environment';
import i18n from 'sveltekit-i18n';
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
        nb: { lang },
        nn: { lang },
    },
    loaders: [
        {
            locale: 'en',
            key: 'layout',
            loader: async () => (await import('../../content/translations/en/layout.json')).default,
        },
        {
            locale: 'nb',
            key: 'layout',
            loader: async () => (await import('../../content/translations/nb/layout.json')).default,
        },
        {
            locale: 'nn',
            key: 'layout',
            loader: async () => (await import('../../content/translations/nn/layout.json')).default,
        },
        {
            locale: 'en',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../content/translations/en/home.json')).default,
        },
        {
            locale: 'nb',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../content/translations/nb/home.json')).default,
        },
        {
            locale: 'nn',
            key: 'home',
            routes: ['/'],
            loader: async () => (await import('../../content/translations/nn/home.json')).default,
        },
        {
            locale: 'en',
            key: 'membership',
            routes: ['/membership', '/membership/registrationComplete'],
            loader: async () => (await import('../../content/translations/en/membership.json')).default,
        },
        {
            locale: 'nb',
            key: 'membership',
            routes: ['/membership', '/membership/registrationComplete'],
            loader: async () => (await import('../../content/translations/nb/membership.json')).default,
        },
        {
            locale: 'nn',
            key: 'membership',
            routes: ['/membership', '/membership/registrationComplete'],
            loader: async () => (await import('../../content/translations/nn/membership.json')).default,
        },
        {
            locale: 'en',
            key: 'volunteer',
            routes: ['/volunteer'],
            loader: async () => (await import('../../content/translations/en/volunteer.json')).default,
        },
        {
            locale: 'nb',
            key: 'volunteer',
            routes: ['/volunteer'],
            loader: async () => (await import('../../content/translations/nb/volunteer.json')).default,
        },
        {
            locale: 'nn',
            key: 'volunteer',
            routes: ['/volunteer'],
            loader: async () => (await import('../../content/translations/nn/volunteer.json')).default,
        },
        {
            locale: 'en',
            key: 'events',
            routes: ['/events'],
            loader: async () => (await import('../../content/translations/en/events.json')).default,
        },
        {
            locale: 'nb',
            key: 'events',
            routes: ['/events'],
            loader: async () => (await import('../../content/translations/nb/events.json')).default,
        },
        {
            locale: 'nn',
            key: 'events',
            routes: ['/events'],
            loader: async () => (await import('../../content/translations/nn/events.json')).default,
        },
        {
            locale: 'en',
            key: 'email',
            loader: async () => (await import('../../content/translations/en/email.json')).default,
        },
        {
            locale: 'nb',
            key: 'email',
            loader: async () => (await import('../../content/translations/nb/email.json')).default,
        },
        {
            locale: 'nn',
            key: 'email',
            loader: async () => (await import('../../content/translations/nn/email.json')).default,
        },
    ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));