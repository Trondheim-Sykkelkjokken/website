import { dev } from '$app/environment';
import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

const LOCALES = ['en', 'nb', 'nn'];

const KEYS = {
    layout: undefined,
    home: ['/'],
    membership: ['/membership', '/membership/registrationComplete'],
    events: ['/events'],
    resources: ['/resources'],
    tools: ['/tools'],
    volunteer: ['/volunteer'],
    counter: undefined,
};

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
    loaders: Object.entries(KEYS).flatMap(([key, routes]) =>
        LOCALES.map((locale) => ({
            locale,
            key,
            ...(routes ? { routes } : {}),
            loader: async () =>
                (await import(`../../content/translations/${locale}/${key}.json`)).default,
        })),
    ),
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
