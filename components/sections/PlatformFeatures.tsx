"use client";

import { m } from "framer-motion";
import {
  Search,
  GitCompare,
  Hotel,
  Plane,
  Languages,
  FileText,
  Map,
  Headphones,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const features = [
  { icon: Search, key: "search" },
  { icon: GitCompare, key: "comparison" },
  { icon: Hotel, key: "accommodation" },
  { icon: Plane, key: "transfers" },
  { icon: Languages, key: "translation" },
  { icon: FileText, key: "visa" },
  { icon: Map, key: "tourism" },
  { icon: Headphones, key: "support" },
];

export function PlatformFeatures() {
  const { t } = useTranslation();

  return (
    <section id="platform" className="py-14 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("platform.badge")}
            title={t("platform.title")}
            subtitle={t("platform.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.key} delay={i * 0.05}>
              <m.div
                whileHover={{ y: -3 }}
                className="group h-full p-6 rounded-xl bg-white border border-border hover:border-navy-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center mb-4 group-hover:bg-navy-700 transition-colors">
                  <feature.icon className="w-[18px] h-[18px] text-white" />
                </div>
                <h3 className="text-sm font-semibold text-navy-900 mb-1.5">
                  {t(`platform.features.${feature.key}.title`)}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  {t(`platform.features.${feature.key}.desc`)}
                </p>
              </m.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
