"use client";

import Link from "next/link";
import { ChevronRight, BadgeDollarSign } from "lucide-react";
import {
  procedureCategoryIds,
  specialtyCategoryIds,
  getProceduresByCategory,
  getProcedurePriceKzt,
  type ProcedureCity,
  type ProcedureCategoryId,
} from "@/lib/data/procedures";
import { formatUsdFromKzt } from "@/lib/utils/currency";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProcedureFlowBar } from "@/components/procedures/ProcedureFlowBar";
import {
  ProceduresPageShell,
  ProceduresPageHeader,
} from "@/components/procedures/ProceduresPageShell";

interface ProceduresCategoryViewProps {
  city: ProcedureCity;
  categoryId: ProcedureCategoryId;
}

export function ProceduresCategoryView({ city, categoryId }: ProceduresCategoryViewProps) {
  const { t } = useTranslation();
  const items = getProceduresByCategory(categoryId);
  const categoryLabel = t(`procedures.categories.${categoryId}`);
  const cityName = t(`cities.${city}`);
  const allCategories = [...procedureCategoryIds, ...specialtyCategoryIds];

  return (
    <ProceduresPageShell>
      <ProcedureFlowBar
        city={city}
        currentStep={2}
        categoryId={categoryId}
        categoryLabel={categoryLabel}
      />

      <ProceduresPageHeader
        badge={t("procedures.badge")}
        title={`${categoryLabel}, ${cityName}`}
        subtitle={t("procedures.categorySubtitle")}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        <AnimatedSection delay={0.05}>
          <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden mb-12">
            <div className="hidden sm:grid sm:grid-cols-[1fr_auto] gap-4 px-6 py-3 bg-navy-50 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted">
              <span>{t("procedures.procedureColumn")}</span>
              <span>{t("procedures.priceColumn")}</span>
            </div>
            {items.map((item, i) => {
              const priceKzt = getProcedurePriceKzt(item, city);
              return (
                <Link
                  key={item.id}
                  href={`/procedures/${city}/${categoryId}/${item.id}`}
                  className={`group flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 hover:bg-kz-blue/[0.03] transition-colors ${
                    i < items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="hidden sm:flex w-9 h-9 rounded-lg bg-kz-blue/10 items-center justify-center shrink-0">
                      <BadgeDollarSign className="w-4 h-4 text-kz-blue" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-kz-blue-dark group-hover:text-kz-blue group-hover:underline">
                      {t(`procedures.items.${item.id}.name`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[13px] sm:text-[14px] text-navy-800 font-semibold">
                      {t("procedures.startingFrom")} {formatUsdFromKzt(priceKzt)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-kz-blue rtl-flip" />
                  </div>
                </Link>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-sm font-semibold text-navy-900 mb-3">{t("procedures.browseOther")}</h2>
          <div className="flex flex-wrap gap-2">
            {allCategories
              .filter((id) => id !== categoryId)
              .slice(0, 14)
              .map((catId) => (
                <Link
                  key={catId}
                  href={`/procedures/${city}/${catId}`}
                  className="px-3 py-1.5 text-[12px] font-medium rounded-lg border border-border bg-white text-kz-blue hover:border-kz-blue/30 hover:bg-kz-blue/5 transition-colors"
                >
                  {t(`procedures.categories.${catId}`)}
                </Link>
              ))}
          </div>
        </AnimatedSection>
      </div>
    </ProceduresPageShell>
  );
}
