"use client";

import { Search, ClipboardList, CalendarCheck, Plane } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const steps = [
  { step: 1, icon: Search, key: "choose" },
  { step: 2, icon: ClipboardList, key: "recommend" },
  { step: 3, icon: CalendarCheck, key: "book" },
  { step: 4, icon: Plane, key: "travel" },
];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-14 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("how.badge")}
            title={t("how.title")}
            subtitle={t("how.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-border" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.key} delay={i * 0.12}>
              <div className="relative text-center">
                <div className="relative inline-flex mb-5">
                  <div className="w-14 h-14 rounded-xl bg-navy-900 flex items-center justify-center relative z-10">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-navy-500 text-white text-[11px] font-bold flex items-center justify-center z-20">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-navy-900 mb-2">
                  {t(`how.steps.${step.key}.title`)}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed max-w-[240px] mx-auto">
                  {t(`how.steps.${step.key}.desc`)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
