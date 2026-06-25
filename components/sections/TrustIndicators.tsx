"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Languages,
  Lock,
  HeartHandshake,
  FileCheck,
  Globe2,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const indicators = [
  { icon: ShieldCheck, key: "accredited" },
  { icon: FileCheck, key: "pricing" },
  { icon: Languages, key: "multilingual" },
  { icon: Lock, key: "privacy" },
  { icon: HeartHandshake, key: "patientFirst" },
  { icon: Globe2, key: "network" },
];

export function TrustIndicators() {
  const { t } = useTranslation();

  return (
    <section className="py-14 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("trust.badge")}
            title={t("trust.title")}
            subtitle={t("trust.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {indicators.map((item, i) => (
            <AnimatedSection key={item.key} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group h-full flex gap-4 p-6 rounded-2xl glass-card hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-navy-600 to-navy-500 flex items-center justify-center shadow-lg shadow-navy-500/20 group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-navy-900 mb-1.5">
                    {t(`trust.items.${item.key}.title`)}
                  </h3>
                  <p className="text-[13px] text-muted leading-relaxed">
                    {t(`trust.items.${item.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
