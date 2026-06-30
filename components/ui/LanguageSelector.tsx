"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { localeMeta, locales, type Locale } from "@/lib/i18n/config";

export function LanguageSelector({ light = false }: { light?: boolean }) {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = localeMeta[locale];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 h-10 sm:h-11 px-2.5 sm:px-3 rounded-lg text-[13px] sm:text-[14px] font-medium whitespace-nowrap transition-colors shrink-0 ${
          light
            ? "text-white/80 hover:text-white hover:bg-white/10"
            : "text-navy-700 hover:bg-surface border border-border"
        }`}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute end-0 mt-2 w-48 rounded-xl bg-white border border-border shadow-xl shadow-navy-900/10 overflow-hidden z-50 p-1.5"
          >
            {locales.map((l: Locale) => {
              const meta = localeMeta[l];
              const active = l === locale;
              return (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                    active
                      ? "bg-navy-50 text-navy-900"
                      : "text-navy-700 hover:bg-surface"
                  }`}
                >
                  <span className="text-base leading-none">{meta.flag}</span>
                  <span className="flex-1 text-start">
                    <span className="block font-medium">{meta.native}</span>
                    <span className="block text-[11px] text-muted">
                      {meta.label}
                    </span>
                  </span>
                  {active && <Check className="w-3.5 h-3.5 text-navy-600" />}
                </button>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
