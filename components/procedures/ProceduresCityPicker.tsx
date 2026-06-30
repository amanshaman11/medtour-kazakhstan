"use client";

import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { procedureCities } from "@/lib/data/procedures";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  ProceduresPageShell,
  ProceduresPageHeader,
} from "@/components/procedures/ProceduresPageShell";

export function ProceduresCityPicker() {
  const { t } = useTranslation();

  return (
    <ProceduresPageShell>
      <ProceduresPageHeader
        badge={t("procedures.badge")}
        title={t("procedures.cityPicker.title")}
        subtitle={t("procedures.cityPicker.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {procedureCities.map((city) => (
              <Link
                key={city}
                href={`/procedures/${city}`}
                className="group relative rounded-2xl border border-border bg-white shadow-sm hover:border-kz-blue/30 hover:shadow-lg hover:shadow-kz-blue/10 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-kz-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-kz-blue/10 flex items-center justify-center mb-4 group-hover:bg-kz-blue/20 transition-colors">
                    <MapPin className="w-6 h-6 text-kz-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-navy-900 mb-2">{t(`cities.${city}`)}</h2>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {t(`procedures.cityPicker.cities.${city}`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-kz-blue-dark group-hover:text-kz-blue">
                    {t("procedures.cityPicker.browse")}
                    <ChevronRight className="w-4 h-4 rtl-flip" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12">
          <h2 className="text-lg font-bold text-navy-900 mb-6">{t("procedures.home.howTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["step1", "step2", "step3", "step4"] as const).map((step, i) => (
              <div
                key={step}
                className="rounded-xl border border-border bg-white p-5 shadow-sm"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-kz-blue/10 text-kz-blue-dark text-sm font-bold mb-3">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold text-navy-900">{t(`procedures.home.${step}`)}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </ProceduresPageShell>
  );
}
