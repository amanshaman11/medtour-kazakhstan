"use client";

import { motion } from "framer-motion";
import {
  Smile,
  Baby,
  Heart,
  Bone,
  Sparkles,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const categories = [
  { icon: Smile, key: "dentistry", href: "#search" },
  { icon: Baby, key: "ivf", href: "#search" },
  { icon: Heart, key: "cardiology", href: "#search" },
  { icon: Bone, key: "orthopedics", href: "#search" },
  { icon: Sparkles, key: "plasticSurgery", href: "#search" },
  { icon: Stethoscope, key: "checkups", href: "#search" },
];

export function TreatmentCategories() {
  const { t } = useTranslation();

  return (
    <section id="treatments" className="py-14 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("treatments.badge")}
            title={t("treatments.title")}
            subtitle={t("treatments.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.key} delay={i * 0.06}>
              <motion.a
                href={cat.href}
                whileHover={{ y: -3 }}
                className="group block h-full p-7 rounded-xl bg-white border border-border hover:border-navy-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-5 group-hover:bg-navy-100 transition-colors">
                  <cat.icon className="w-6 h-6 text-navy-700" />
                </div>
                <h3 className="text-[16px] font-semibold text-navy-900 mb-2">
                  {t(`treatmentCats.${cat.key}.name`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {t(`treatmentCats.${cat.key}.desc`)}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-[12px] text-muted">
                    {t(`treatmentCats.${cat.key}.procedures`)}
                  </span>
                  <span className="flex items-center gap-1 text-[13px] font-medium text-navy-700 group-hover:gap-2 transition-all">
                    {t("treatmentCats.search")}
                    <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                  </span>
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
