"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { defaultLocale, isRtl, locales, type Locale } from "./config";
import en from "./translations/en.json";
import ru from "./translations/ru.json";
import kk from "./translations/kk.json";
import uz from "./translations/uz.json";
import ky from "./translations/ky.json";
import tg from "./translations/tg.json";
import ar from "./translations/ar.json";
import zh from "./translations/zh.json";
import ruProcedureItems from "./procedure-items/ru.json";
import kkProcedureItems from "./procedure-items/kk.json";
import uzProcedureItems from "./procedure-items/uz.json";
import kyProcedureItems from "./procedure-items/ky.json";
import tgProcedureItems from "./procedure-items/tg.json";
import arProcedureItems from "./procedure-items/ar.json";
import zhProcedureItems from "./procedure-items/zh.json";

type Dict = Record<string, unknown>;
type ProcedureItemFields = {
  name?: string;
  description?: string;
  summary?: string;
};

const procedureItemOverrides: Partial<Record<Locale, Record<string, ProcedureItemFields>>> = {
  ru: ruProcedureItems as Record<string, ProcedureItemFields>,
  kk: kkProcedureItems as Record<string, ProcedureItemFields>,
  uz: uzProcedureItems as Record<string, ProcedureItemFields>,
  ky: kyProcedureItems as Record<string, ProcedureItemFields>,
  tg: tgProcedureItems as Record<string, ProcedureItemFields>,
  ar: arProcedureItems as Record<string, ProcedureItemFields>,
  zh: zhProcedureItems as Record<string, ProcedureItemFields>,
};

const dictionaries: Record<Locale, Dict> = {
  en,
  ru,
  kk,
  uz,
  ky,
  tg,
  ar,
  zh,
};

function resolveRaw(dict: Dict, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Dict)[part]
          : undefined,
      dict
    );
}

function resolveKey(dict: Dict, key: string): string | undefined {
  const value = resolveRaw(dict, key);
  return typeof value === "string" ? value : undefined;
}

function resolveArray(dict: Dict, key: string): string[] | undefined {
  const value = resolveRaw(dict, key);
  return Array.isArray(value) && value.every((v) => typeof v === "string")
    ? (value as string[])
    : undefined;
}

function resolveProcedureItem(locale: Locale, key: string): string | undefined {
  const match = key.match(/^procedures\.items\.([^.]+)\.(name|description|summary)$/);
  if (!match || locale === "en") return undefined;
  const [, id, field] = match;
  const item = procedureItemOverrides[locale]?.[id];
  const value = item?.[field as keyof ProcedureItemFields];
  return typeof value === "string" ? value : undefined;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  ta: (key: string) => string[];
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "medtour-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Read persisted locale after mount to keep SSR/first paint hydration-safe
    // (server always renders the default locale).
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    const dir = isRtl(locale) ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const procedureItem = resolveProcedureItem(locale, key);
      if (procedureItem) return procedureItem;

      return (
        resolveKey(dictionaries[locale], key) ??
        resolveKey(dictionaries.en, key) ??
        key
      );
    },
    [locale]
  );

  const ta = useCallback(
    (key: string): string[] => {
      return (
        resolveArray(dictionaries[locale], key) ??
        resolveArray(dictionaries.en, key) ??
        []
      );
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t, ta, dir: isRtl(locale) ? "rtl" : "ltr" }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return ctx;
}
