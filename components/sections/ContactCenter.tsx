"use client";

import { m } from "framer-motion";
import {
  Phone,
  Clock,
  Calendar,
  ClipboardList,
  AlertCircle,
  Languages,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const features = [
  { icon: Clock, key: "support" },
  { icon: Calendar, key: "appointment" },
  { icon: ClipboardList, key: "planning" },
  { icon: AlertCircle, key: "emergency" },
  { icon: Languages, key: "interpreter" },
];

export function ContactCenter() {
  const { t } = useTranslation();

  return (
    <section id="contact-center" className="py-14 lg:py-20 gradient-mesh relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("contact.badge")}
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
            dark
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="text-center mb-14">
            <m.a
              href="tel:1717"
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <p className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text tracking-tight">
                1717
              </p>
            </m.a>
            <p className="text-white/60 text-[15px] mt-3">
              {t("contact.availability")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.key} delay={i * 0.06}>
              <m.div
                whileHover={{ y: -3 }}
                className="h-full p-5 rounded-xl bg-white/5 border border-white/8 hover:border-white/12 transition-all"
              >
                <feature.icon className="w-5 h-5 text-navy-400 mb-3" />
                <h3 className="text-[14px] font-semibold text-white mb-1.5">
                  {t(`contact.features.${feature.key}.title`)}
                </h3>
                <p className="text-[12px] text-white/60 leading-relaxed">
                  {t(`contact.features.${feature.key}.desc`)}
                </p>
              </m.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:1717"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-navy-900 text-[15px] font-semibold rounded-lg hover:bg-navy-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t("contact.call")}
            </a>
            <a
              href="mailto:contact@medtour.kz"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white/15 rounded-lg hover:bg-white/8 transition-colors"
            >
              contact@medtour.kz
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
