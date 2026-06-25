"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section id="cta" className="py-14 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden gradient-mesh px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight"
              >
                {t("cta.title")}
              </motion.h2>

              <p className="mt-5 text-[16px] text-white/55 max-w-lg mx-auto leading-relaxed">
                {t("cta.subtitle")}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#search"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-navy-900 text-[15px] font-semibold rounded-xl hover:bg-navy-50 transition-all hover:shadow-xl hover:shadow-white/10"
                >
                  {t("cta.findTreatment")}
                  <ArrowRight className="w-4 h-4 rtl-flip group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="tel:1717"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white glass rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t("cta.call")}
                </a>
              </div>

              <p className="mt-8 text-[13px] text-white/45">{t("cta.note")}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
