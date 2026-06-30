"use client";

import { m } from "framer-motion";
import {
  DollarSign,
  Users,
  Zap,
  Clock,
  Globe,
  Mountain,
  Shield,
  Heart,
  Building2,
  Package,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

type Accent = "blue" | "gold" | "navy";

const accentStyles: Record<
  Accent,
  { iconBg: string; icon: string; line: string }
> = {
  blue: {
    iconBg: "bg-kz-blue/10",
    icon: "text-kz-blue",
    line: "bg-kz-blue",
  },
  gold: {
    iconBg: "bg-kz-gold/10",
    icon: "text-kz-gold",
    line: "bg-kz-gold",
  },
  navy: {
    iconBg: "bg-navy-600/10",
    icon: "text-navy-600",
    line: "bg-navy-600",
  },
};

export function WhyChooseKazakhstan() {
  const { t } = useTranslation();

  const reasons: {
    icon: typeof Building2;
    key: string;
    accent: Accent;
    namespace: "whyKazakhstan" | "why";
  }[] = [
    { icon: Building2, key: "recognized", accent: "blue", namespace: "why" },
    { icon: DollarSign, key: "affordable", accent: "gold", namespace: "whyKazakhstan" },
    { icon: Users, key: "specialists", accent: "navy", namespace: "whyKazakhstan" },
    { icon: Zap, key: "equipment", accent: "blue", namespace: "whyKazakhstan" },
    { icon: Clock, key: "waiting", accent: "blue", namespace: "whyKazakhstan" },
    { icon: Clock, key: "fast", accent: "navy", namespace: "why" },
    { icon: Globe, key: "support", accent: "navy", namespace: "whyKazakhstan" },
    { icon: Package, key: "packages", accent: "gold", namespace: "why" },
    { icon: Mountain, key: "destinations", accent: "gold", namespace: "whyKazakhstan" },
    { icon: Shield, key: "safety", accent: "blue", namespace: "whyKazakhstan" },
    { icon: Heart, key: "care", accent: "navy", namespace: "whyKazakhstan" },
  ];

  return (
    <section id="why-kazakhstan" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-kz-blue/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-kz-gold/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("whyKazakhstan.badge")}
            title={t("whyKazakhstan.title")}
            subtitle={t("whyKazakhstan.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const styles = accentStyles[reason.accent];
            const titleKey =
              reason.namespace === "why"
                ? `why.cards.${reason.key}.title`
                : `whyKazakhstan.reasons.${reason.key}.title`;
            const descriptionKey =
              reason.namespace === "why"
                ? `why.cards.${reason.key}.desc`
                : `whyKazakhstan.reasons.${reason.key}.description`;

            return (
              <AnimatedSection key={`${reason.namespace}-${reason.key}`} delay={index * 0.06}>
                <m.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group h-full"
                >
                  <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-surface to-white border border-border hover:border-navy-200 transition-all duration-300 shadow-sm hover:shadow-xl card-shine overflow-hidden flex flex-col">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${styles.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300 shrink-0`}
                    >
                      <Icon className={`w-7 h-7 ${styles.icon}`} />
                    </div>

                    <h3 className="text-[1.05rem] lg:text-lg font-bold text-navy-900 mb-3 leading-snug text-balance break-words min-h-[2.75rem] lg:min-h-[3rem]">
                      {t(titleKey)}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed flex-1 break-words">{t(descriptionKey)}</p>

                    <div
                      className={`absolute bottom-0 left-0 h-1 ${styles.line} w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl`}
                    />
                  </div>
                </m.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
