"use client";

import { motion } from "framer-motion";
import { MapPin, BadgeCheck, ExternalLink } from "lucide-react";
import { partnerHospitals } from "@/lib/data/partners";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

export function PartnerHospitals() {
  const { t } = useTranslation();

  // Duplicate list for seamless marquee loop
  const marquee = [...partnerHospitals, ...partnerHospitals];

  return (
    <section id="partners" className="py-14 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("partners.badge")}
            title={t("partners.title")}
            subtitle={t("partners.subtitle")}
          />
        </AnimatedSection>

        {/* Logo marquee */}
        <AnimatedSection delay={0.1}>
          <div className="marquee-mask overflow-hidden mb-12 py-2">
            <div className="flex w-max animate-marquee gap-4">
              {marquee.map((h, i) => (
                <div
                  key={`${h.id}-${i}`}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface border border-border whitespace-nowrap"
                >
                  <BadgeCheck className="w-4 h-4 text-navy-500 shrink-0" />
                  <span className="text-[13px] font-semibold text-navy-800">
                    {h.name}
                  </span>
                  <span className="text-[11px] text-muted">
                    · {t(`cities.${h.city.toLowerCase()}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partnerHospitals.slice(0, 8).map((h, i) => (
            <AnimatedSection key={h.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="gradient-ring group h-full p-6 rounded-2xl bg-white border border-border hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300 card-shine"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center">
                    <span className="text-navy-700 font-bold text-sm">
                      {h.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                  {h.established && (
                    <span className="text-[11px] text-muted">
                      {t("common.est")} {h.established}
                    </span>
                  )}
                </div>

                <h3 className="text-[15px] font-semibold text-navy-900 leading-snug mb-1.5">
                  {h.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[12px] text-muted mb-3">
                  <MapPin className="w-3.5 h-3.5 rtl-flip" />
                  {t(`cities.${h.city.toLowerCase()}`)}
                </div>
                <p className="text-[13px] text-muted leading-relaxed mb-4">
                  {t(`partners.items.${h.id}.focus`)}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-navy-700">
                    <BadgeCheck className="w-3 h-3" />
                    {t(`accreditations.${h.accreditationKey}`)}
                  </span>
                  {h.website && (
                    <a
                      href={`https://${h.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-navy-700 transition-colors"
                      aria-label={`${t("partners.visit")} ${h.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
