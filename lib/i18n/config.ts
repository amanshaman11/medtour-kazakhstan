export const locales = [
  "en",
  "ru",
  "kk",
  "uz",
  "ky",
  "tg",
  "ar",
  "zh",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales: Locale[] = ["ar"];

export const localeMeta: Record<
  Locale,
  { label: string; native: string; flag: string }
> = {
  en: { label: "English", native: "English", flag: "🇬🇧" },
  ru: { label: "Russian", native: "Русский", flag: "🇷🇺" },
  kk: { label: "Kazakh", native: "Қазақша", flag: "🇰🇿" },
  uz: { label: "Uzbek", native: "Oʻzbekcha", flag: "🇺🇿" },
  ky: { label: "Kyrgyz", native: "Кыргызча", flag: "🇰🇬" },
  tg: { label: "Tajik", native: "Тоҷикӣ", flag: "🇹🇯" },
  ar: { label: "Arabic", native: "العربية", flag: "🇸🇦" },
  zh: { label: "Chinese", native: "中文", flag: "🇨🇳" },
};

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
