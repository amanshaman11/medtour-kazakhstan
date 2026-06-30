"use client";

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
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let observer: IntersectionObserver | undefined;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();

        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
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
          {stats.map((stat) => (
            <AnimatedSection key={stat.label}>
              <div className="glass rounded-2xl p-6 lg:p-8 text-center h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-accent-light" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[13px] text-white/50 mt-1.5">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
