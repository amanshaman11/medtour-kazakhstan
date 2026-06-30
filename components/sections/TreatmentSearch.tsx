"use client";

import { m, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, BadgeCheck, Phone, Mail, Globe } from "lucide-react";
import { useState, useMemo } from "react";
import { clinics, categoryLabels } from "@/lib/data/clinics";
import type { TreatmentCategory } from "@/lib/data/types";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const categories: { id: TreatmentCategory | "all"; key: string }[] = [
  { id: "all", key: "all" },
  { id: "dental", key: "dental" },
  { id: "ivf", key: "ivf" },
  { id: "cardiology", key: "cardiology" },
  { id: "plastic-surgery", key: "plasticSurgery" },
  { id: "orthopedics", key: "orthopedics" },
];

const categoryKeyById: Record<TreatmentCategory, string> = {
  dental: "dental",
  ivf: "ivf",
  cardiology: "cardiology",
  "plastic-surgery": "plasticSurgery",
  orthopedics: "orthopedics",
};

export function TreatmentSearch() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    TreatmentCategory | "all"
  >("all");

  const results = useMemo(() => {
    return clinics.filter((clinic) => {
      const matchesCategory =
        activeCategory === "all" ||
        clinic.categories.includes(activeCategory);

      if (!query.trim()) return matchesCategory;

      const q = query.toLowerCase();
      const searchable = [
        clinic.name,
        clinic.city,
        clinic.specialty,
        ...clinic.categories.map((c) => categoryLabels[c]),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(q);
    });
  }, [query, activeCategory]);

  return (
    <section id="search" className="py-14 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("search.badge")}
            title={t("search.title")}
            subtitle={t("search.subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t("search.title")}
                placeholder={t("search.placeholder")}
                className="w-full pl-12 pr-4 py-4 text-[15px] bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500/20 focus:border-navy-400 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? "bg-navy-900 text-white"
                    : "bg-surface text-muted border border-border hover:border-navy-200 hover:text-navy-900"
                }`}
              >
                {t(`search.categories.${cat.key}`)}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="popLayout">
          <m.div
            key={`${query}-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {results.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-muted text-[15px]">{t("search.empty")}</p>
              </div>
            ) : (
              results.map((clinic, i) => (
                <m.div
                  key={clinic.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-6 rounded-xl border border-border bg-white hover:border-navy-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-[15px] font-semibold text-navy-900">
                        {clinic.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-[13px] text-muted">
                        <MapPin className="w-3.5 h-3.5 rtl-flip" />
                        {t(`cities.${clinic.city.toLowerCase()}`)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[13px] font-semibold text-navy-900">
                        {clinic.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-[13px] text-navy-700 font-medium mb-2">
                    {t(`specialties.${clinic.specialtyKey}`)}
                  </p>

                  <p className="text-[13px] text-muted leading-relaxed mb-4">
                    {t(`search.items.${clinic.id}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-4 text-[12px] text-muted">
                    <span>
                      {t("search.foundedIn")} {clinic.foundedYear}
                    </span>
                    <span>
                      {t("search.patientsLabel")}: {clinic.patientsServed}
                    </span>
                  </div>

                  {clinic.accredited && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-navy-50 text-[11px] font-semibold text-navy-700 mb-4">
                      <BadgeCheck className="w-3 h-3" />
                      {t(`accreditations.${clinic.accreditationKey}`)}
                    </span>
                  )}

                  <p className="text-[13px] text-muted mb-4">
                    {clinic.priceRange.replace("Est.", t("common.est"))}
                  </p>

                  <div className="pt-4 border-t border-border space-y-2">
                    {clinic.phone && (
                      <a
                        href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-[13px] text-navy-700 hover:text-navy-500 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        {clinic.phone}
                      </a>
                    )}
                    {clinic.email && (
                      <a
                        href={`mailto:${clinic.email}`}
                        className="flex items-center gap-2 text-[13px] text-muted hover:text-navy-700 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        {clinic.email}
                      </a>
                    )}
                    {clinic.website && (
                      <a
                        href={`https://${clinic.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] text-muted hover:text-navy-700 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        {clinic.website}
                      </a>
                    )}
                  </div>
                </m.div>
              ))
            )}
          </m.div>
        </AnimatePresence>

        <p className="text-center text-[13px] text-muted mt-8">
          {t("search.showing")} {results.length}{" "}
          {results.length !== 1 ? t("search.clinics") : t("search.clinic")}
          {activeCategory !== "all"
            ? ` · ${t(`search.categories.${categoryKeyById[activeCategory as TreatmentCategory]}`)}`
            : ""}
        </p>
        <p className="text-center text-[12px] text-muted/70 mt-2">
          {t("search.disclaimer")}
        </p>
      </div>
    </section>
  );
}
