"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, HeartPulse, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { homeHref } from "@/lib/utils/routes";

const ctaClassName =
  "inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3.5 sm:px-4 text-[13px] sm:text-[14px] font-bold whitespace-nowrap rounded-lg bg-kz-gold text-navy-900 border-2 border-navy-900/15 shadow-lg shadow-kz-gold/30 hover:bg-[#f5b800] transition-colors shrink-0";

export function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.why"), href: homeHref("#why-kazakhstan") },
    { label: t("nav.platform"), href: homeHref("#platform") },
    { label: t("nav.procedures"), href: homeHref("#procedures") },
    { label: t("nav.treatments"), href: homeHref("#treatments") },
    { label: t("nav.clinics"), href: homeHref("#search") },
    { label: t("nav.packages"), href: homeHref("#packages") },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-[100] bg-white border-b border-kz-blue/15 shadow-md"
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 h-16 lg:h-[4.5rem]">
        <div className="flex h-full items-center justify-between gap-2 sm:gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 group shrink-0 min-w-0 max-w-[40%] sm:max-w-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kz-blue to-kz-blue-dark flex items-center justify-center shadow-lg shadow-kz-blue/25 group-hover:shadow-kz-blue/40 transition-shadow shrink-0">
              <HeartPulse className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="hidden md:inline font-semibold text-[15px] xl:text-[16px] tracking-tight text-navy-900 whitespace-nowrap truncate">
              MedTour Kazakhstan
            </span>
          </Link>

          <div className="hidden xl:flex flex-1 items-center justify-center gap-x-3 2xl:gap-x-4 min-w-0 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center h-10 px-1.5 text-[13px] xl:text-[14px] font-medium whitespace-nowrap text-muted hover:text-kz-blue-dark transition-colors shrink-0"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link href={homeHref("#search")} className={ctaClassName} aria-label={t("nav.findTreatment")}>
              <Search className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline max-w-[9rem] truncate">{t("nav.findTreatment")}</span>
            </Link>

            <div className="flex items-center h-10 sm:h-11">
              <LanguageSelector />
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-navy-900 shrink-0"
              aria-label={t("nav.menu")}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="xl:hidden bg-white border-b border-border shadow-lg overflow-hidden"
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm text-navy-800 border-b border-border last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
