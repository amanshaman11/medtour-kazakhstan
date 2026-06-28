"use client";

import { BadgeCheck, MapPin, Star } from "lucide-react";
import type { Clinic } from "@/lib/data/types";
import { useTranslation } from "@/lib/i18n/I18nProvider";

interface ProcedureClinicCardProps {
  clinic: Clinic;
  selected?: boolean;
  onSelect: () => void;
}

export function ProcedureClinicCard({
  clinic,
  selected,
  onSelect,
}: ProcedureClinicCardProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border p-5 sm:p-6 transition-all ${
        selected
          ? "border-kz-blue bg-kz-blue/5 shadow-md ring-2 ring-kz-blue/20"
          : "border-border bg-white hover:border-kz-blue/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-[15px] sm:text-base font-bold text-navy-900 leading-snug">
            {clinic.name}
          </h3>
          <p className="text-[12px] text-muted mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {clinic.city}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg bg-kz-gold/15 text-navy-900">
          <Star className="w-3.5 h-3.5 text-kz-gold-dark fill-kz-gold" />
          <span className="text-[12px] font-bold">{clinic.rating}</span>
        </div>
      </div>

      <p className="text-[13px] text-navy-700 mb-3 leading-relaxed">
        {t(`specialties.${clinic.specialtyKey}`)}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {clinic.accredited && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-kz-blue/10 text-[11px] font-semibold text-kz-blue-dark">
            <BadgeCheck className="w-3.5 h-3.5" />
            {t(`accreditations.${clinic.accreditationKey}`)}
          </span>
        )}
        <span className="text-[11px] text-muted">
          {t("search.foundedIn")} {clinic.foundedYear}
        </span>
        <span className="text-[11px] text-muted">
          {clinic.patientsServed} {t("search.patientsLabel").toLowerCase()}
        </span>
      </div>

      <p className="text-[13px] font-semibold text-kz-blue-dark">{clinic.priceRange}</p>
    </button>
  );
}
