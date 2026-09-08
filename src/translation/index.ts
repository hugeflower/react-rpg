import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr/translationFr.json';
import en from './locales/en/translationEn.json';

const savedLang = localStorage.getItem('lang') ?? 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            fr: { translation: fr },
            en: { translation: en },
        },
        lng: savedLang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('lang', lng);
});

export default i18n;