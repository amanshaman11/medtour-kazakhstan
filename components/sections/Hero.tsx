"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Play, MapPin, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useRef } from "react";
import { CallCenterBanner } from "@/components/sections/CallCenterBanner";
import { HERO_VIDEO_SRC } from "@/lib/constants/media";

export function Hero() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProcedures = () => {
    document.getElementById("procedures")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-navy-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="absolute inset-0 gradient-kz-hero" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Kazakhstan color side accents */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-kz-blue/60 to-transparent" />
        <div className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-gradient-to-b from-transparent via-kz-gold/50 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-10 pb-28 sm:pb-32 lg:pb-36 translate-y-[1cm]">
        <motion.div style={{ opacity }} className="max-w-3xl flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5 max-w-full sm:max-w-2xl px-3 sm:px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-kz-blue animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-white/90 leading-snug text-balance">
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[1.9rem] sm:text-[2.35rem] md:text-4xl lg:text-[3rem] xl:text-[3.35rem] font-bold tracking-tight leading-[1.12] text-white mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
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
            className="flex flex-wrap gap-5"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-kz-blue" />
              <span className="text-xs sm:text-sm text-white/70">{t("hero.trust1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-kz-gold" />
              <span className="text-xs sm:text-sm text-white/70">{t("hero.trust2")}</span>
            </div>
          </motion.div>
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

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:hidden absolute top-24 right-5 z-10"
        >
          <div className="flex items-center gap-2 glass rounded-full px-3 py-2 border border-white/15">
            <Image
              src="/images/kazakhstan-flag.jpg"
              alt={t("hero.kazakhstan")}
              width={36}
              height={24}
              className="rounded-sm object-cover shadow-sm"
            />
            <span className="text-sm font-semibold text-white/90">{t("hero.kazakhstan")}</span>
          </div>
        </motion.div>
      </div>

      <CallCenterBanner embedded />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToProcedures}
        className="absolute bottom-[4.5rem] sm:bottom-[5rem] lg:bottom-[5.25rem] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors group cursor-pointer"
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
    </section>
  );
}
