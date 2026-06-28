"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Scan,
  Activity,
  Smile,
  Waves,
  Bone,
  FileText,
  Syringe,
  Stethoscope,
  ArrowRight,
  MapPin,
  Building2,
  LayoutGrid,
  BadgeDollarSign,
  ShieldCheck,
  Headphones,
  CalendarCheck,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";
import {
  procedureCities,
  procedureCategoryIds,
  getTotalProcedureCount,
  getProcedurePriceKzt,
  procedures,
  type ProcedureCity,
} from "@/lib/data/procedures";
import { clinics } from "@/lib/data/clinics";
import { formatUsdFromKzt } from "@/lib/utils/currency";

const categoryIcons: Record<string, typeof Scan> = {
  "check-up": Activity,
  ct: Scan,
  mri: Scan,
  ultrasound: Waves,
  dentistry: Smile,
  xray: Bone,
  massage: Activity,
  "functional-diagnostics": Stethoscope,
  "treatment-room": Syringe,
  certificates: FileText,
};

const popularProcedureIds = [
  "dental-implant",
  "full-body-mri-checkup",
  "cardio-consultation",
  "mri-brain",
  "executive-checkup",
  "dental-crown",
] as const;

const flowSteps = [
  { icon: MapPin, key: "step1" },
  { icon: LayoutGrid, key: "step2" },
  { icon: BadgeDollarSign, key: "step3" },
  { icon: Building2, key: "step4" },
] as const;

export function MedicalProcedures() {
  const { t } = useTranslation();
  const [city, setCity] = useState<ProcedureCity>("almaty");
  const total = getTotalProcedureCount();
  const clinicCount = clinics.length;

  const popularItems = popularProcedureIds
    .map((id) => procedures.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section id="procedures" className="py-14 lg:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-kz-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-kz-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <AnimatedSection>
          <SectionHeader
            badge={t("procedures.badge")}
            title={t("procedures.title")}
            subtitle={t("procedures.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {[
              { value: `${total}+`, label: t("procedures.home.statsProcedures") },
              { value: "3", label: t("procedures.home.statsCities") },
              { value: `${clinicCount}`, label: t("procedures.home.statsClinics") },
              { value: "50%", label: t("procedures.home.statsSavings") },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 sm:p-5 rounded-xl border border-border bg-surface/80"
              >
                <p className="text-2xl sm:text-3xl font-bold text-navy-900 mb-1">{stat.value}</p>
                <p className="text-[12px] sm:text-[13px] text-muted font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="rounded-2xl border border-kz-blue/15 bg-gradient-to-br from-navy-900/5 via-white to-kz-gold/5 p-6 sm:p-8 mb-10">
            <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1">
              {t("procedures.home.howTitle")}
            </h3>
            <p className="text-sm text-muted mb-6">{t("procedures.home.howSubtitle")}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {flowSteps.map(({ icon: Icon, key }, i) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-kz-blue/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-kz-blue" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-kz-blue-dark mb-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[13px] font-semibold text-navy-800 leading-snug">
                      {t(`procedures.home.${key}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {procedureCities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all ${
                  city === c
                    ? "bg-navy-900 text-white"
                    : "bg-surface text-muted border border-border hover:border-navy-200"
                }`}
              >
                {t(`cities.${c}`)}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mb-8">
            <h3 className="text-base font-bold text-navy-900 mb-1">
              {t("procedures.home.popularTitle")}
            </h3>
            <p className="text-sm text-muted mb-4">{t("procedures.home.popularSubtitle")}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularItems.map((item) => {
                if (!item) return null;
                const price = formatUsdFromKzt(getProcedurePriceKzt(item, city));
                return (
                  <Link
                    key={item.id}
                    href={`/procedures/${city}/${item.categoryId}/${item.id}`}
                    className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-white hover:border-kz-blue/30 hover:shadow-md transition-all"
                  >
                    <span className="text-[13px] font-semibold text-kz-blue-dark group-hover:text-kz-blue leading-snug">
                      {t(`procedures.items.${item.id}.name`)}
                    </span>
                    <span className="text-[12px] font-bold text-navy-900 shrink-0">
                      {t("procedures.startingFrom")} {price}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <p className="text-center text-sm font-semibold text-navy-800 mb-4">
            {t("procedures.mainCategories")}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {procedureCategoryIds.map((catId, i) => {
            const Icon = categoryIcons[catId] ?? Stethoscope;
            return (
              <AnimatedSection key={catId} delay={i * 0.03}>
                <Link
                  href={`/procedures/${city}/${catId}`}
                  className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-xl border border-border bg-surface hover:border-kz-blue/30 hover:shadow-md hover:bg-white transition-all h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-kz-blue/10 flex items-center justify-center mb-3 group-hover:bg-kz-blue/15 transition-colors">
                    <Icon className="w-5 h-5 text-kz-blue" />
                  </div>
                  <span className="text-[13px] font-semibold text-kz-blue-dark group-hover:text-kz-blue transition-colors leading-snug">
                    {t(`procedures.categories.${catId}`)}
                  </span>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.16}>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: BadgeDollarSign, title: t("procedures.home.benefit1Title"), desc: t("procedures.home.benefit1Desc") },
              { icon: ShieldCheck, title: t("procedures.home.benefit2Title"), desc: t("procedures.home.benefit2Desc") },
              { icon: Headphones, title: t("procedures.home.benefit3Title"), desc: t("procedures.home.benefit3Desc") },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-xl border border-border bg-surface">
                <Icon className="w-5 h-5 text-kz-blue mb-3" />
                <h4 className="text-sm font-bold text-navy-900 mb-1.5">{title}</h4>
                <p className="text-[13px] text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <div className="text-center">
            <Link
              href={`/procedures/${city}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kz-gold text-navy-900 text-sm font-bold rounded-xl border-2 border-navy-900/10 shadow-lg shadow-kz-gold/25 hover:bg-[#f5b800] transition-colors"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              {t("procedures.mobile.bookAppointment")}
              <ArrowRight className="w-4 h-4 rtl-flip" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
