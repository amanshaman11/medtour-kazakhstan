"use client";

import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";
import {
  procedureCategoryIds,
  specialtyCategoryIds,
  getTotalProcedureCount,
  type ProcedureCity,
} from "@/lib/data/procedures";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProcedureFlowBar } from "@/components/procedures/ProcedureFlowBar";
import { CitySwitcher } from "@/components/procedures/CitySwitcher";
import {
  ProceduresPageShell,
  ProceduresPageHeader,
} from "@/components/procedures/ProceduresPageShell";

export function ProceduresCityView({ city }: { city: ProcedureCity }) {
  const { t } = useTranslation();
  const total = getTotalProcedureCount();
  const cityName = t(`cities.${city}`);

  return (
    <ProceduresPageShell>
      <ProcedureFlowBar city={city} currentStep={1} />

      <ProceduresPageHeader
        badge={t("procedures.badge")}
        title={`${t("procedures.medicalProceduresIn")} ${cityName}`}
        subtitle={`${t("procedures.total")}: ${total} · ${t("procedures.subtitle")}`}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              {t("procedures.cityPicker.switchCity")}
            </p>
            <CitySwitcher activeCity={city} />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div id="procedure-categories" className="scroll-mt-32">
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="w-5 h-5 text-kz-blue" />
              <h2 className="text-lg font-bold text-navy-900">{t("procedures.mainCategories")}</h2>
            </div>
            <div className="rounded-2xl border border-border bg-white shadow-sm p-6 sm:p-8 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {procedureCategoryIds.map((catId) => (
                  <Link
                    key={catId}
                    href={`/procedures/${city}/${catId}`}
                    className="group flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border border-border bg-surface hover:border-kz-blue/30 hover:bg-kz-blue/5 transition-all"
                  >
                    <span className="text-[13px] sm:text-[14px] font-semibold text-navy-800 group-hover:text-kz-blue-dark">
                      {t(`procedures.categories.${catId}`)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-kz-blue rtl-flip shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-lg font-bold text-navy-900 mb-4">{t("procedures.bySpecialty")}</h2>
          <div className="rounded-2xl border border-border bg-white shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {specialtyCategoryIds.map((catId) => (
                <Link
                  key={catId}
                  href={`/procedures/${city}/${catId}`}
                  className="group flex items-center justify-between gap-2 px-4 py-3 rounded-xl hover:bg-surface transition-colors"
                >
                  <span className="text-[13px] font-medium text-kz-blue group-hover:underline">
                    {t(`procedures.categories.${catId}`)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-kz-blue/50 rtl-flip shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </ProceduresPageShell>
  );
}
