"use client";

import { motion } from "framer-motion";
import { Menu, X, HeartPulse, Phone, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

const ctaClassName =
  "inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[13px] font-bold whitespace-nowrap leading-none rounded-lg bg-kz-gold text-navy-900 border-2 border-navy-900/15 shadow-lg shadow-kz-gold/30 hover:bg-[#f5b800] transition-colors shrink-0";

export function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.why"), href: "#why-kazakhstan" },
    { label: t("nav.platform"), href: "#platform" },
    { label: t("nav.treatments"), href: "#treatments" },
    { label: t("nav.clinics"), href: "#search" },
    { label: t("nav.packages"), href: "#packages" },
    { label: t("nav.contact"), href: "tel:1717" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-[100] bg-white border-b border-kz-blue/15 shadow-md"
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center h-16 lg:h-[4.5rem] gap-2 sm:gap-3 min-w-0">
          <a href="#" className="flex items-center gap-2 group shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kz-blue to-kz-blue-dark flex items-center justify-center shadow-lg shadow-kz-blue/25 group-hover:shadow-kz-blue/40 transition-shadow shrink-0">
              <HeartPulse className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="hidden md:inline font-semibold text-[14px] xl:text-[15px] tracking-tight text-navy-900 whitespace-nowrap">
              MedTour Kazakhstan
            </span>
          </a>

          <div className="hidden xl:flex flex-1 items-center justify-center gap-4 min-w-0 px-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] xl:text-[13px] font-medium whitespace-nowrap leading-none text-muted hover:text-kz-blue-dark transition-colors shrink-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex-1 xl:hidden" aria-hidden="true" />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="#search"
              className={ctaClassName}
              aria-label={t("nav.findTreatment")}
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{t("nav.findTreatment")}</span>
            </a>

            <a
              href="tel:1717"
              className="hidden lg:inline-flex items-center gap-1.5 text-[12px] xl:text-[13px] font-semibold whitespace-nowrap leading-none text-navy-700 transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              1717
            </a>

            <LanguageSelector />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-navy-900 shrink-0"
              aria-label="Toggle menu"
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm text-navy-800 border-b border-border last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
