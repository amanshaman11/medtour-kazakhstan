"use client";

import { motion } from "framer-motion";
import { Building2, DollarSign, Clock, Package } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const reasons = [
  { icon: Building2, key: "recognized", gradient: "from-blue-500 to-cyan-400" },
  { icon: DollarSign, key: "affordable", gradient: "from-emerald-500 to-teal-400" },
  { icon: Clock, key: "fast", gradient: "from-violet-500 to-purple-400" },
  { icon: Package, key: "packages", gradient: "from-amber-500 to-orange-400" },
];

export function WhyKazakhstan() {
  const { t } = useTranslation();

  return (
    <section id="why-kazakhstan" className="py-14 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("why.badge")}
            title={t("why.title")}
            subtitle={t("why.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item, i) => (
            <AnimatedSection key={item.key} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="gradient-ring group h-full p-7 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300 card-shine"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[15px] font-semibold text-navy-900 mb-2.5 leading-snug">
                  {t(`why.cards.${item.key}.title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(`why.cards.${item.key}.desc`)}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
