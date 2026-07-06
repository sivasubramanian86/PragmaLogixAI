/**
 * i18n translation strings aggregator for PragmaLogixAI.
 * Imports modular language files and compiles the translation map.
 *
 * Import chain (no cycles):
 *   strings.ts  ← standalone interface
 *   en.ts       ← imports from ./i18n/strings
 *   [lang].ts   ← imports from ./i18n/strings + ./i18n/en
 *   translations.ts ← imports all lang files, re-exports Strings + helpers
 */
import type { Language } from './types';
export type { Strings } from './i18n/strings';
import type { Strings } from './i18n/strings';

import { en } from './i18n/en';
import { es } from './i18n/es';
import { hi } from './i18n/hi';
import { ta } from './i18n/ta';
import { kn } from './i18n/kn';
import { te } from './i18n/te';
import { fr } from './i18n/fr';
import { de } from './i18n/de';
import { it } from './i18n/it';
import { ja } from './i18n/ja';
import { zh } from './i18n/zh';
import { pt } from './i18n/pt';
import { ru } from './i18n/ru';
import { ko } from './i18n/ko';
import { ar } from './i18n/ar';
import { tr } from './i18n/tr';
import { nl } from './i18n/nl';
import { sv } from './i18n/sv';
import { pl } from './i18n/pl';
import { vi } from './i18n/vi';
import { th } from './i18n/th';
import { id } from './i18n/id';


const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español (Spanish)",
  fr: "Français (French)",
  de: "Deutsch (German)",
  it: "Italiano (Italian)",
  ja: "日本語 (Japanese)",
  zh: "简体中文 (Chinese)",
  pt: "Português (Portuguese)",
  ru: "Русский (Russian)",
  ko: "한국어 (Korean)",
  hi: "हिंदी (Hindi)",
  ta: "தமிழ் (Tamil)",
  kn: "ಕನ್ನಡ (Kannada)",
  te: "తెలుగు (Telugu)",
  ar: "العربية (Arabic)",
  tr: "Türkçe (Turkish)",
  nl: "Nederlands (Dutch)",
  sv: "Svenska (Swedish)",
  pl: "Polski (Polish)",
  vi: "Tiếng Việt (Vietnamese)",
  th: "ภาษาไทย (Thai)",
  id: "Bahasa Indonesia (Indonesian)",
};

const compiledTranslations: Record<Language, Strings> = {
  en: { ...en, languages: languageNames },
  es: { ...es, languages: languageNames },
  hi: { ...hi, languages: languageNames },
  ta: { ...ta, languages: languageNames },
  kn: { ...kn, languages: languageNames },
  te: { ...te, languages: languageNames },
  fr: { ...fr, languages: languageNames },
  de: { ...de, languages: languageNames },
  it: { ...it, languages: languageNames },
  ja: { ...ja, languages: languageNames },
  zh: { ...zh, languages: languageNames },
  pt: { ...pt, languages: languageNames },
  ru: { ...ru, languages: languageNames },
  ko: { ...ko, languages: languageNames },
  ar: { ...ar, languages: languageNames },
  tr: { ...tr, languages: languageNames },
  nl: { ...nl, languages: languageNames },
  sv: { ...sv, languages: languageNames },
  pl: { ...pl, languages: languageNames },
  vi: { ...vi, languages: languageNames },
  th: { ...th, languages: languageNames },
  id: { ...id, languages: languageNames },
};

export const translations = compiledTranslations;

export function useTranslations(lang: Language): Strings {
  return translations[lang] || translations.en;
}

export default translations;
