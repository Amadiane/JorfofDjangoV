import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./components/locales/en/translation.json";
import translationFR from "./components/locales/fr/translation.json";
import translationAR from "./components/locales/ar/translation.json";


const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  ar: { translation: translationAR }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // langue par défaut
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
