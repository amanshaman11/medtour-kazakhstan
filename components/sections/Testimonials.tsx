"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

export function Testimonials() {
  const { t: tr } = useTranslation();

  return (
    <section className="py-14 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={tr("testimonials.badge")}
            title={tr("testimonials.title")}
            subtitle={tr("testimonials.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3 }}
                className="h-full p-6 rounded-xl bg-white border border-border hover:shadow-md transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-navy-100 mb-4" />

                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                <p className="text-[14px] text-navy-800 leading-relaxed mb-6">
                  &ldquo;{tr(`testimonials.items.${t.id}.quote`)}&rdquo;
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="text-[14px] font-semibold text-navy-900">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-muted mt-0.5">
                    {tr(`testimonials.items.${t.id}.country`)} ·{" "}
                    {tr(`testimonials.items.${t.id}.treatment`)}
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
