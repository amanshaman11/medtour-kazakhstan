"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
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
import { ProcedureClinicCard } from "@/components/procedures/ProcedureClinicCard";
import { ConsultationForm } from "@/components/procedures/ConsultationForm";
import {
  ProceduresPageShell,
  ProceduresPageHeader,
} from "@/components/procedures/ProceduresPageShell";

interface ProcedureClinicSelectViewProps {
  city: ProcedureCity;
  categoryId: ProcedureCategoryId;
  procedureId: string;
}

export function ProcedureClinicSelectView({
  city,
  categoryId,
  procedureId,
}: ProcedureClinicSelectViewProps) {
  const { t } = useTranslation();
  const procedure = getProcedure(categoryId, procedureId);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  if (!procedure) return null;

  const priceKzt = getProcedurePriceKzt(procedure, city);
  const procedureName = t(`procedures.items.${procedure.id}.name`);
  const categoryLabel = t(`procedures.categories.${categoryId}`);
  const cityName = t(`cities.${city}`);
  const clinics = getClinicsForProcedure(city, categoryId);
  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) ?? null;

  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ProceduresPageShell>
      <ProcedureFlowBar
        city={city}
        currentStep={selectedClinic ? 5 : 4}
        categoryId={categoryId}
        categoryLabel={categoryLabel}
        procedureName={procedureName}
        procedureHref={`/procedures/${city}/${categoryId}/${procedureId}`}
        clinicName={selectedClinic?.name}
      />

      <ProceduresPageHeader
        badge={categoryLabel}
        title={t("procedures.clinics.title")}
        subtitle={`${t("procedures.clinics.subtitle")} · ${procedureName} · ${cityName}`}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        <AnimatedSection>
          <div className="rounded-2xl border border-kz-blue/15 bg-gradient-to-r from-kz-blue/5 to-white p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-kz-blue-dark mb-1">
                {procedureName}
              </p>
              <p className="text-sm text-muted">{cityName}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] uppercase tracking-wider text-muted mb-1">
                {t("procedures.estimatedPrice")}
              </p>
              <p className="text-xl font-bold text-navy-900">
                {t("procedures.startingFrom")} {formatUsdFromKzt(priceKzt)}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-5 h-5 text-kz-blue" />
            <h2 className="text-base font-bold text-navy-900">
              {t("procedures.clinics.available").replace("{count}", String(clinics.length))}
            </h2>
          </div>

          <div id="clinic-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 scroll-mt-32">
            {clinics.map((clinic) => (
              <ProcedureClinicCard
                key={clinic.id}
                clinic={clinic}
                selected={selectedClinicId === clinic.id}
                onSelect={() => setSelectedClinicId(clinic.id)}
              />
            ))}
          </div>
        </AnimatedSection>

        {selectedClinic && (
          <AnimatedSection delay={0.1}>
            <div className="lg:hidden mb-6 rounded-xl border border-kz-blue/20 bg-kz-blue/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-kz-blue-dark mb-1">
                {t("procedures.clinics.selected")}
              </p>
              <h3 className="text-base font-bold text-navy-900">{selectedClinic.name}</h3>
              <button
                type="button"
                onClick={scrollToForm}
                className="mt-3 text-sm font-semibold text-kz-blue-dark underline underline-offset-2"
              >
                {t("procedures.mobile.fillForm")}
              </button>
            </div>

            <div id="consultation-form" className="max-w-xl mx-auto lg:max-w-none lg:grid lg:grid-cols-5 lg:gap-8 scroll-mt-28">
              <div className="hidden lg:block lg:col-span-2">
                <div className="rounded-2xl border border-border bg-surface p-6 sticky top-40">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-2">
                    {t("procedures.clinics.selected")}
                  </p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{selectedClinic.name}</h3>
                  <p className="text-sm text-muted mb-4">{t(`specialties.${selectedClinic.specialtyKey}`)}</p>
                  <p className="text-sm font-semibold text-kz-blue-dark">{selectedClinic.priceRange}</p>
                </div>
              </div>
              <div className="lg:col-span-3">
                <ConsultationForm
                  procedureName={procedureName}
                  cityName={cityName}
                  procedureId={procedureId}
                  categoryId={categoryId}
                  clinicId={selectedClinic.id}
                  clinicName={selectedClinic.name}
                />
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </ProceduresPageShell>
  );
}
