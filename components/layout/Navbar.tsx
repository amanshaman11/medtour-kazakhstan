"use client";

import { motion } from "framer-motion";
import { Menu, X, HeartPulse, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.why"), href: "#why-kazakhstan" },
    { label: t("nav.platform"), href: "#platform" },
    { label: t("nav.treatments"), href: "#treatments" },
    { label: t("nav.clinics"), href: "#partners" },
    { label: t("nav.packages"), href: "#packages" },
    { label: t("nav.contact"), href: "#contact-center" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-border shadow-sm shadow-navy-900/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-[4.5rem]">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-700 to-navy-500 flex items-center justify-center shadow-lg shadow-navy-500/20 group-hover:shadow-navy-500/40 transition-shadow">
            <HeartPulse className="w-[18px] h-[18px] text-white" />
          </div>
          <span
            className={`font-semibold text-[15px] tracking-tight transition-colors ${
              scrolled ? "text-navy-900" : "text-white"
            }`}
          >
            MedTour Kazakhstan
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium transition-colors ${
                scrolled
                  ? "text-muted hover:text-navy-900"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="tel:1717"
            className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
              scrolled ? "text-navy-700" : "text-white/85"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            1717
          </a>
          <LanguageSelector light={!scrolled} />
          <a
            href="#search"
            className="px-4 py-2 text-[13px] font-semibold text-white bg-navy-700 hover:bg-navy-600 rounded-lg transition-colors shadow-sm shadow-navy-700/20"
          >
            {t("nav.findTreatment")}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <LanguageSelector light={!scrolled} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 ${scrolled ? "text-navy-900" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-white border-b border-border shadow-lg overflow-hidden"
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
            <a
              href="#search"
              onClick={() => setMobileOpen(false)}
              className="mt-3 py-3 text-center text-sm font-semibold text-white bg-navy-700 rounded-lg"
            >
              {t("nav.findTreatment")}
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
