"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Play, MapPin, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useRef } from "react";

const HERO_VIDEO = "/images/mountains-compressed.mp4";

export function Hero() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToContent = () => {
    document.getElementById("city-selection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/almaty.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div className="absolute inset-0 gradient-kz-hero" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Kazakhstan color side accents */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-kz-blue/60 to-transparent" />
        <div className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-gradient-to-b from-transparent via-kz-gold/50 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-10">
        <motion.div style={{ opacity }} className="max-w-3xl flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-kz-blue animate-pulse" />
            <span className="text-sm sm:text-base font-medium text-white/90">{t("hero.eyebrow")}</span>
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
              href="tel:1717"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white glass rounded-xl hover:bg-white/15 transition-all"
            >
              {t("hero.contactExpert")}
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

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
        aria-label={t("hero.scrollDown")}
      >
        <span className="text-xs uppercase tracking-wider font-medium">{t("hero.discover")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2 group-hover:border-kz-blue/60 transition-colors"
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
