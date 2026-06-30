"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { procedureCities, type ProcedureCity } from "@/lib/data/procedures";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function CitySwitcher({ activeCity }: { activeCity: ProcedureCity }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      {procedureCities.map((city) => {
        const isActive = city === activeCity;
        return (
          <Link
            key={city}
            href={`/procedures/${city}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
              isActive
                ? "bg-kz-blue text-white border-kz-blue shadow-sm"
                : "bg-white text-navy-800 border-border hover:border-kz-blue/30 hover:bg-kz-blue/5"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {t(`cities.${city}`)}
          </Link>
        );
      })}
    </div>
  );
}
