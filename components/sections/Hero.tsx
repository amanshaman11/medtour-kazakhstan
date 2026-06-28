"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Play, MapPin, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { CallCenterBanner } from "@/components/sections/CallCenterBanner";

export function Hero({ background }: { background: React.ReactNode }) {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProcedures = () => {
    document.getElementById("procedures")?.scrollIntoView({ behavior: "smooth" });
  };

  const discoverButtonClass =
    "flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors group cursor-pointer";

  return (
    <section className="relative min-h-[calc(100dvh+8rem)] lg:h-screen lg:min-h-[600px] overflow-x-hidden">
      {background}

      <div className="relative w-full max-w-7xl mx-auto px-5 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 pt-[5.25rem] sm:pt-24 lg:pt-0 pb-[13.5rem] sm:pb-36 lg:pb-36 lg:h-full lg:translate-y-[1cm]">
        <motion.div style={{ opacity }} className="max-w-3xl flex-1 min-w-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5 max-w-full px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-kz-blue animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-white/90 leading-snug text-balance">
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:hidden flex items-center gap-2 mb-4 w-fit max-w-full"
          >
            <Image
              src="/images/kazakhstan-flag.jpg"
              alt={t("hero.kazakhstan")}
              width={32}
              height={21}
              className="rounded-sm object-cover shadow-sm shrink-0"
            />
            <span className="text-xs font-semibold text-white/85 truncate">{t("hero.kazakhstan")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[1.75rem] sm:text-[2.35rem] md:text-4xl lg:text-[3rem] xl:text-[3.35rem] font-bold tracking-tight leading-[1.12] text-white mb-4 sm:mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[15px] sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 sm:mb-10"
          >
            <a
              href="#search"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-kz text-white text-sm font-semibold rounded-xl hover:shadow-2xl hover:shadow-kz-blue/30 transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4" />
              {t("hero.exploreTreatments")}
            </a>
            <a
              href="#procedures"
              onClick={(e) => {
                e.preventDefault();
                scrollToProcedures();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white glass rounded-xl hover:bg-white/15 transition-all border border-white/20"
            >
              <MapPin className="w-4 h-4 text-kz-gold" />
              {t("citySelection.badge")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5"
          >
            <div className="flex items-start gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-kz-blue shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-white/70 leading-snug">{t("hero.trust1")}</span>
            </div>
            <div className="flex items-start gap-2 min-w-0">
              <Award className="w-4 h-4 text-kz-gold shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-white/70 leading-snug">{t("hero.trust2")}</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            onClick={scrollToProcedures}
            className={`lg:hidden mt-10 ${discoverButtonClass}`}
            aria-label={t("hero.scrollDown")}
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium">{t("hero.discover")}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 group-hover:border-kz-blue/60 transition-colors"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full bg-kz-blue/80"
              />
            </motion.div>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex flex-col items-center shrink-0"
        >
          <div className="glass rounded-2xl p-6 border border-white/15 shadow-2xl shadow-kz-blue/10">
            <Image
              src="/images/kazakhstan-flag.jpg"
              alt={t("hero.kazakhstan")}
              width={120}
              height={80}
              className="rounded-lg object-cover shadow-lg ring-2 ring-kz-gold/30"
              priority
            />
            <p className="mt-4 text-center text-base font-semibold text-white tracking-wide">
              {t("hero.kazakhstan")}
            </p>
          </div>
        </motion.div>
      </div>

      <CallCenterBanner embedded />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToProcedures}
        className={`hidden lg:flex absolute bottom-[5.25rem] left-1/2 -translate-x-1/2 z-30 ${discoverButtonClass}`}
        aria-label={t("hero.scrollDown")}
      >
        <span className="text-xs uppercase tracking-wider font-medium">{t("hero.discover")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 group-hover:border-kz-blue/60 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-kz-blue/80"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
