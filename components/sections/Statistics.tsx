"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Building2, Users, Globe2, Stethoscope } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

interface Stat {
  icon: typeof Building2;
  value: number;
  suffix: string;
  label: string;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span ref={ref}>
      {Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const { t } = useTranslation();

  const stats: Stat[] = [
    { icon: Building2, value: 50, suffix: "+", label: t("hero.statHospitals") },
    { icon: Users, value: 15000, suffix: "+", label: t("hero.statPatients") },
    { icon: Globe2, value: 40, suffix: "+", label: t("stats.countries") },
    { icon: Stethoscope, value: 200, suffix: "+", label: t("stats.procedures") },
  ];

  return (
    <section className="relative py-20 lg:py-24 gradient-mesh overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("stats.badge")}
            title={t("stats.title")}
            subtitle={t("stats.subtitle")}
            dark
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 lg:p-8 text-center h-full"
              >
                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-accent-light" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[13px] text-white/50 mt-1.5">{stat.label}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
