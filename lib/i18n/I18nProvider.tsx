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

type Dict = Record<string, unknown>;
type ProcedureItemFields = {
  name?: string;
  description?: string;
  summary?: string;
};

const localeLoaders: Record<Locale, () => Promise<{ default: Dict }>> = {
  en: () => import("./translations/en.json"),
  ru: () => import("./translations/ru.json"),
  kk: () => import("./translations/kk.json"),
  uz: () => import("./translations/uz.json"),
  ky: () => import("./translations/ky.json"),
  tg: () => import("./translations/tg.json"),
  ar: () => import("./translations/ar.json"),
  zh: () => import("./translations/zh.json"),
};

const procedureItemLoaders: Partial<
  Record<Locale, () => Promise<{ default: Record<string, ProcedureItemFields> }>>
> = {
  ru: () => import("./procedure-items/ru.json"),
  kk: () => import("./procedure-items/kk.json"),
  uz: () => import("./procedure-items/uz.json"),
  ky: () => import("./procedure-items/ky.json"),
  tg: () => import("./procedure-items/tg.json"),
  ar: () => import("./procedure-items/ar.json"),
  zh: () => import("./procedure-items/zh.json"),
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
  const [dictionaries, setDictionaries] = useState<Partial<Record<Locale, Dict>>>({
    en: en as Dict,
  });
  const [procedureItemOverrides, setProcedureItemOverrides] = useState<
    Partial<Record<Locale, Record<string, ProcedureItemFields>>>
  >({});

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    if (dictionaries[locale]) return;

    let cancelled = false;
    localeLoaders[locale]().then((module) => {
      if (cancelled) return;
      setDictionaries((prev) => ({ ...prev, [locale]: module.default }));
    });

    return () => {
      cancelled = true;
    };
  }, [locale, dictionaries]);

  useEffect(() => {
    if (locale === "en" || procedureItemOverrides[locale]) return;

    const loader = procedureItemLoaders[locale];
    if (!loader) return;

    let cancelled = false;
    loader().then((module) => {
      if (cancelled) return;
      setProcedureItemOverrides((prev) => ({
        ...prev,
        [locale]: module.default as Record<string, ProcedureItemFields>,
      }));
    });

    return () => {
      cancelled = true;
    };
  }, [locale, procedureItemOverrides]);

  useEffect(() => {
    const dir = isRtl(locale) ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const resolveProcedureItem = useCallback(
    (key: string): string | undefined => {
      const match = key.match(/^procedures\.items\.([^.]+)\.(name|description|summary)$/);
      if (!match || locale === "en") return undefined;
      const [, id, field] = match;
      const item = procedureItemOverrides[locale]?.[id];
      const value = item?.[field as keyof ProcedureItemFields];
      return typeof value === "string" ? value : undefined;
    },
    [locale, procedureItemOverrides]
  );

  const t = useCallback(
    (key: string): string => {
      const procedureItem = resolveProcedureItem(key);
      if (procedureItem) return procedureItem;

      const activeDict = dictionaries[locale];
      const fallbackDict = dictionaries.en ?? (en as Dict);

      return (
        (activeDict ? resolveKey(activeDict, key) : undefined) ??
        resolveKey(fallbackDict, key) ??
        key
      );
    },
    [locale, dictionaries, resolveProcedureItem]
  );

  const ta = useCallback(
    (key: string): string[] => {
      const activeDict = dictionaries[locale];
      const fallbackDict = dictionaries.en ?? (en as Dict);

      return (
        (activeDict ? resolveArray(activeDict, key) : undefined) ??
        resolveArray(fallbackDict, key) ??
        []
      );
    },
    [locale, dictionaries]
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
