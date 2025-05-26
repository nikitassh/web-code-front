import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import az from "./locales/az.json";
import by from "./locales/by.json";
import ge from "./locales/ge.json";
import kz from "./locales/kz.json";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";
import uz from "./locales/uz.json";

export const resources = {
  ru: { translation: ru },
  uk: { translation: uk },
  uz: { translation: uz },
  by: { translation: by },
  kz: { translation: kz },
  az: { translation: az },
  ge: { translation: ge },
} as const;

export const LANGUAGES = [
  { value: "ru", label: "🇷🇺" },
  { value: "uk", label: "🇺🇦" },
  { value: "uz", label: "🇺🇿" },
  { value: "by", label: "🇧🇾" },
  { value: "kz", label: "🇰🇿" },
  { value: "az", label: "🇦🇿" },
  { value: "ge", label: "🇬🇪" },
];

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
