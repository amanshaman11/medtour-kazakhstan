"use client";

import { m } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { travelPackages } from "@/lib/data/packages";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

export function MedicalTravelPackages() {
  const { t, ta } = useTranslation();

  return (
    <section id="packages" className="py-14 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("travelPackages.badge")}
            title={t("travelPackages.title")}
            subtitle={t("travelPackages.subtitle")}
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6">
          {travelPackages.map((pkg, i) => (
            <AnimatedSection key={pkg.id} delay={i * 0.1}>
              <m.div
                whileHover={{ y: -4 }}
                className={`relative h-full rounded-xl border p-7 transition-all duration-300 ${
                  pkg.popular
                    ? "border-navy-700 bg-navy-950 text-white shadow-xl shadow-navy-900/20"
                    : "border-border bg-white hover:border-navy-200 hover:shadow-lg"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-navy-500 text-[11px] font-semibold text-white uppercase tracking-wider">
                    {t("travelPackages.mostPopular")}
                  </span>
                )}

                <div className="mb-6">
                  <p
                    className={`text-[13px] font-medium mb-1 ${
                      pkg.popular ? "text-white/50" : "text-muted"
                    }`}
                  >
                    {pkg.days} {t("travelPackages.days")}
                  </p>
                  <h3
                    className={`text-xl font-bold tracking-tight ${
                      pkg.popular ? "text-white" : "text-navy-900"
                    }`}
                  >
                    {t(`travelPackages.items.${pkg.id}.name`)}
                  </h3>
                  <p
                    className={`text-2xl font-bold mt-3 ${
                      pkg.popular ? "text-white" : "text-navy-700"
                    }`}
                  >
                    {t("travelPackages.from")} {pkg.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {ta(`travelPackages.items.${pkg.id}.includes`).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          pkg.popular ? "text-navy-400" : "text-navy-600"
                        }`}
                      />
                      <span
                        className={`text-[13px] leading-relaxed ${
                          pkg.popular ? "text-white/70" : "text-muted"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="tel:1717"
                  className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all hover:gap-2.5 ${
                    pkg.popular
                      ? "text-white"
                      : "text-navy-700"
                  }`}
                >
                  {t("travelPackages.request")}
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </a>
              </m.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
