import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./src/assets/locales/en/translation.json";
import ru from "./src/assets/locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
