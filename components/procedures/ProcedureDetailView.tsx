"use client";

import Link from "next/link";
import { ShieldCheck, Clock, Phone, Building2, ArrowRight, Check } from "lucide-react";
import {
  getProcedure,
  getProcedurePriceKzt,
  type ProcedureCity,
  type ProcedureCategoryId,
} from "@/lib/data/procedures";
import { getClinicsForProcedure } from "@/lib/data/procedure-clinics";
import { formatUsdFromKzt } from "@/lib/utils/currency";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProcedureFlowBar } from "@/components/procedures/ProcedureFlowBar";
import {
  ProceduresPageShell,
  ProceduresPageHeader,
} from "@/components/procedures/ProceduresPageShell";

interface ProcedureDetailViewProps {
  city: ProcedureCity;
  categoryId: ProcedureCategoryId;
  procedureId: string;
}

export function ProcedureDetailView({
  city,
  categoryId,
  procedureId,
}: ProcedureDetailViewProps) {
  const { t, ta } = useTranslation();
  const procedure = getProcedure(categoryId, procedureId);

  if (!procedure) return null;

  const priceKzt = getProcedurePriceKzt(procedure, city);
  const procedureName = t(`procedures.items.${procedure.id}.name`);
  const categoryLabel = t(`procedures.categories.${categoryId}`);
  const cityName = t(`cities.${city}`);
  const summaryKey = `procedures.items.${procedure.id}.summary`;
  const summary = t(summaryKey);
  const summaryText = summary !== summaryKey ? summary : t(`procedures.items.${procedure.id}.description`);
  const description = t(`procedures.items.${procedure.id}.description`);
  const detailsSuffix = t(`procedures.categoryDetailsSuffix.${categoryId}`);
  const includes = ta(`procedures.includesByCategory.${categoryId}`);
  const clinicCount = getClinicsForProcedure(city, categoryId).length;
  const clinicsHref = `/procedures/${city}/${categoryId}/${procedureId}/clinics`;

  return (
    <ProceduresPageShell>
      <ProcedureFlowBar
        city={city}
        currentStep={3}
        categoryId={categoryId}
        categoryLabel={categoryLabel}
        procedureName={procedureName}
      />

      <ProceduresPageHeader
        badge={categoryLabel}
        title={procedureName}
        subtitle={`${cityName} · ${t("procedures.detailSubtitle")}`}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatedSection>
            <div className="rounded-2xl border border-kz-blue/20 bg-gradient-to-br from-kz-blue/5 via-white to-kz-gold/5 p-6 sm:p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-kz-blue-dark mb-2">
                {t("procedures.estimatedPrice")}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-navy-900 mb-2">
                {t("procedures.startingFrom")} {formatUsdFromKzt(priceKzt)}
              </p>
              <p className="text-[13px] text-muted">{t("procedures.priceNote")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-bold text-navy-900 mb-2">
                {t("procedures.aboutProcedure")}
              </h2>
              <p className="text-[15px] font-medium text-kz-blue-dark leading-relaxed mb-4">
                {summaryText}
              </p>
              <p className="text-[15px] text-navy-700 leading-relaxed mb-5">
                {description}
              </p>

              {detailsSuffix && detailsSuffix !== `procedures.categoryDetailsSuffix.${categoryId}` && (
                <div className="rounded-xl bg-surface border border-border p-4 sm:p-5 mb-5">
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-navy-800 mb-2">
                    {t("procedures.learnMore")}
                  </h3>
                  <p className="text-[14px] text-navy-700 leading-relaxed">{detailsSuffix}</p>
                </div>
              )}

              {includes.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-navy-800 mb-3">
                    {t("procedures.whatsIncluded")}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] text-navy-700 leading-snug"
                      >
                        <Check className="w-4 h-4 text-kz-blue shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, text: t("procedures.trust.accredited") },
                { icon: Clock, text: t("procedures.trust.fast") },
                { icon: Phone, text: t("procedures.trust.support") },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white"
                >
                  <Icon className="w-5 h-5 text-kz-blue shrink-0" />
                  <span className="text-[12px] font-medium text-navy-800 leading-snug">{text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="rounded-2xl border-2 border-kz-blue/25 bg-gradient-to-br from-navy-900 to-kz-blue-dark p-6 sm:p-8 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-kz-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-2">{t("procedures.clinics.nextStep")}</h2>
                  <p className="text-sm text-white/75 leading-relaxed mb-5">
                    {t("procedures.clinics.nextStepDesc").replace("{count}", String(clinicCount))}
                  </p>
                  <Link
                    href={clinicsHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kz-gold text-navy-900 text-sm font-bold rounded-xl border-2 border-white/20 shadow-lg shadow-kz-gold/25 hover:bg-[#f5b800] transition-colors"
                  >
                    {t("procedures.clinics.chooseClinic")}
                    <ArrowRight className="w-4 h-4 rtl-flip" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </ProceduresPageShell>
  );
}
