"use client";

import Link from "next/link";
import { ChevronRight, MapPin, LayoutGrid, FileText, Building2, Send, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import type { ProcedureCity } from "@/lib/data/procedures";

export type ProcedureFlowStep = 1 | 2 | 3 | 4 | 5;

interface ProcedureFlowBarProps {
  city: ProcedureCity;
  currentStep: ProcedureFlowStep;
  categoryId?: string;
  categoryLabel?: string;
  procedureName?: string;
  procedureHref?: string;
  clinicName?: string;
}

const stepIcons = [MapPin, LayoutGrid, FileText, Building2, Send] as const;

export function ProcedureFlowBar({
  city,
  currentStep,
  categoryId,
  categoryLabel,
  procedureName,
  procedureHref,
  clinicName,
}: ProcedureFlowBarProps) {
  const { t } = useTranslation();
  const cityName = t(`cities.${city}`);

  const crumbs: { label: string; href?: string }[] = [
    { label: t("procedures.breadcrumb.home"), href: "/" },
    { label: t("procedures.breadcrumb.all"), href: "/procedures" },
    { label: cityName, href: currentStep > 1 ? `/procedures/${city}` : undefined },
  ];

  if (categoryLabel && categoryId) {
    crumbs.push({
      label: categoryLabel,
      href: currentStep > 2 ? `/procedures/${city}/${categoryId}` : undefined,
    });
  }

  if (procedureName) {
    crumbs.push({
      label: procedureName,
      href: procedureHref && currentStep > 3 ? procedureHref : undefined,
    });
  }

  if (clinicName) {
    crumbs.push({ label: clinicName });
  }

  const steps: { step: ProcedureFlowStep; labelKey: string }[] = [
    { step: 1, labelKey: "procedures.flow.city" },
    { step: 2, labelKey: "procedures.flow.category" },
    { step: 3, labelKey: "procedures.flow.details" },
    { step: 4, labelKey: "procedures.flow.clinic" },
    { step: 5, labelKey: "procedures.flow.consult" },
  ];

  return (
    <div className="sticky top-16 lg:top-[4.5rem] z-40 bg-white/95 backdrop-blur-md border-b border-kz-blue/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3">
        <nav
          aria-label={t("procedures.flow.aria")}
          className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-[13px] text-muted mb-2 sm:mb-3"
        >
          {crumbs.map((item, i) => (
            <span key={`${item.label}-${i}`} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted/40 shrink-0 rtl-flip" />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-kz-blue-dark transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-navy-900 font-semibold truncate max-w-[160px] sm:max-w-xs">
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <ol className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          {steps.map(({ step, labelKey }, index) => {
            const Icon = stepIcons[index];
            const isComplete = step < currentStep;
            const isCurrent = step === currentStep;

            return (
              <li key={step} className="flex items-center gap-1 sm:gap-2 shrink-0">
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-muted/30 hidden sm:block rtl-flip" />
                )}
                <div
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap transition-colors ${
                    isCurrent
                      ? "bg-kz-blue/10 border-kz-blue/30 text-kz-blue-dark"
                      : isComplete
                        ? "bg-navy-50 border-navy-100 text-navy-700"
                        : "bg-surface border-border text-muted"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                      isCurrent
                        ? "bg-kz-blue text-white"
                        : isComplete
                          ? "bg-kz-blue/20 text-kz-blue-dark"
                          : "bg-border text-muted"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Icon className="w-3 h-3" />
                    )}
                  </span>
                  <span className="hidden sm:inline">{t(labelKey)}</span>
                  <span className="sm:hidden">{step}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
