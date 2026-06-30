"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, MapPin, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { HeroRequestPanel } from "@/components/sections/HeroRequestPanel";

export function Hero({ background }: { background: React.ReactNode }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const scrollToProcedures = () => {
    document.getElementById("procedures")?.scrollIntoView({ behavior: "smooth" });
  };

  const fade = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };

  const discoverButtonClass =
    "flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors group cursor-pointer";

  return (
    <section className="relative min-h-screen lg:min-h-[600px] overflow-x-hidden">
      {background}

      <div className="relative w-full max-w-7xl mx-auto px-5 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 pt-[5.25rem] sm:pt-24 lg:pt-0 pb-24 sm:pb-28 lg:pb-20 lg:h-full lg:min-h-screen">
        <motion.div {...fade} className="max-w-3xl flex-1 min-w-0 w-full">
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5 max-w-full px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <div className="w-2 h-2 rounded-full bg-kz-blue animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-white/90 leading-snug text-balance">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1 className="text-[1.75rem] sm:text-[2.35rem] md:text-4xl lg:text-[3rem] xl:text-[3.35rem] font-bold tracking-tight leading-[1.12] text-white mb-4 sm:mb-6">
            {t("hero.title")}
          </h1>

          <p className="text-[15px] sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 sm:mb-10">
            <a
              href="/procedures"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-kz text-white text-sm font-semibold rounded-xl hover:shadow-2xl hover:shadow-kz-blue/30 transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4" />
              {t("nav.bookAppointment")}
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
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
            <div className="flex items-start gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-kz-blue shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-white/70 leading-snug">{t("hero.trust1")}</span>
            </div>
            <div className="flex items-start gap-2 min-w-0">
              <Award className="w-4 h-4 text-kz-gold shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-white/70 leading-snug">{t("hero.trust2")}</span>
            </div>
          </div>

          <button
            onClick={scrollToProcedures}
            className={`lg:hidden mt-10 ${discoverButtonClass}`}
            aria-label={t("hero.scrollDown")}
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium">{t("hero.discover")}</span>
            {!reduce && (
              <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 group-hover:border-kz-blue/60 transition-colors">
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 rounded-full bg-kz-blue/80"
                />
              </div>
            )}
          </button>
        </motion.div>

        <HeroRequestPanel />
      </div>

      <button
        onClick={scrollToProcedures}
        className={`hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ${discoverButtonClass}`}
        aria-label={t("hero.scrollDown")}
      >
        <span className="text-xs uppercase tracking-wider font-medium">{t("hero.discover")}</span>
        {!reduce && (
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 group-hover:border-kz-blue/60 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-kz-blue/80"
            />
          </div>
        )}
      </button>
    </section>
  );
}
