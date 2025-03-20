import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'fr', // Langue par défaut
  fallbackLng: 'en', // Langue de secours
  fallbackLng: 'ar', // Langue de secours
  resources: languageResources, // Ressources de traduction
});

export default i18next;
