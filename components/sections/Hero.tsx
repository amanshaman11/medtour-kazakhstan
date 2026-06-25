"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Globe,
  Award,
  Star,
  BadgeCheck,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function Hero() {
  const { t } = useTranslation();

  const trustBadges = [
    { icon: Shield, label: t("hero.trust1") },
    { icon: Globe, label: t("hero.trust2") },
    { icon: Award, label: t("hero.trust3") },
  ];

  const panelClinics = [
    { name: "Heart Center UMC", city: "astana", tag: t("hero.tagCardiology") },
    { name: "National Hospital", city: "almaty", tag: t("hero.tagSurgery") },
    { name: "Mother & Child UMC", city: "astana", tag: t("hero.tagIVF") },
  ];

  const panelStats = [
    { v: "50+", l: t("hero.panelClinics") },
    { v: "120+", l: t("hero.panelHotels") },
    { v: "5", l: t("hero.panelLanguages") },
  ];

  const stats = [
    { value: "50+", label: t("hero.statHospitals") },
    { value: "15,000+", label: t("hero.statPatients") },
    { value: "40–60%", label: t("hero.statSavings") },
    { value: "24/7", label: t("hero.statSupport") },
  ];

  return (
    <section className="relative min-h-[86vh] lg:min-h-[92vh] overflow-hidden gradient-mesh">
      {/* Mountain + skyline backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/40 to-navy-950" />
        <svg
          className="absolute bottom-0 w-full h-[55%] opacity-40"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 600 L0 380 L120 320 L240 360 L360 260 L480 300 L600 180 L720 240 L840 160 L960 220 L1080 140 L1200 200 L1320 120 L1440 180 L1440 600 Z"
            fill="url(#mGrad)"
          />
          <path
            d="M0 600 L0 460 L160 410 L320 450 L480 380 L640 430 L800 360 L960 420 L1120 370 L1280 430 L1440 390 L1440 600 Z"
            fill="url(#mGrad2)"
          />
          <defs>
            <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a5c" />
              <stop offset="100%" stopColor="#0a1628" />
            </linearGradient>
            <linearGradient id="mGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15304d" />
              <stop offset="100%" stopColor="#0a1628" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute bottom-0 w-full h-[32%] opacity-25"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
        >
          {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280, 1360].map(
            (x, i) => (
              <rect
                key={x}
                x={x}
                y={400 - (60 + (i % 5) * 25 + (i % 3) * 15)}
                width={50 + (i % 4) * 20}
                height={400}
                fill="#1a3a5c"
                opacity={0.4 + (i % 3) * 0.15}
              />
            )
          )}
        </svg>
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
              <span className="text-[12px] font-medium tracking-wide text-white/80">
                {t("hero.eyebrow")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-[2rem] sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight leading-[1.1] text-white"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="mt-5 text-base lg:text-lg text-white/70 leading-relaxed max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#search"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-navy-900 text-[15px] font-semibold rounded-xl hover:bg-navy-50 transition-all hover:shadow-xl hover:shadow-white/10"
              >
                {t("hero.findTreatment")}
                <ArrowRight className="w-4 h-4 rtl-flip group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#concierge"
                className="inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-semibold text-white glass rounded-xl hover:bg-white/10 transition-colors"
              >
                {t("hero.contactConcierge")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            >
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2.5">
                  <badge.icon className="w-4 h-4 text-navy-400" />
                  <span className="text-[13px] text-white/65">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Glass info panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="glass rounded-3xl p-6 shadow-2xl shadow-navy-950/40">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-500 to-accent flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-sm">
                    {t("hero.verifiedHospitals")}
                  </span>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-green-400/15 text-green-300 font-medium">
                  JCI
                </span>
              </div>

              <div className="space-y-2.5">
                {panelClinics.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.12 }}
                    className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{c.name}</p>
                      <p className="text-white/55 text-xs">{t(`cities.${c.city}`)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span className="text-white/70 text-xs">4.9</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-5">
                {panelStats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl bg-white/5 border border-white/10 p-3 text-center"
                  >
                    <p className="text-lg font-bold text-white">{s.v}</p>
                    <p className="text-[11px] text-white/55">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="animate-float absolute -bottom-5 -left-5 glass-light rounded-2xl p-4 shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "S", "M"].map((x) => (
                    <div
                      key={x}
                      className="w-7 h-7 rounded-full bg-navy-600 text-white text-[11px] flex items-center justify-center border-2 border-white"
                    >
                      {x}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">15,000+</p>
                  <p className="text-[11px] text-muted">{t("hero.patientsServed")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-[13px] text-white/55 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
