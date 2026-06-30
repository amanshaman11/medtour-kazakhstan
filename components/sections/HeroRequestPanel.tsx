"use client";

import { Phone, Calendar, Stethoscope, Plane } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { RequestForm } from "@/components/sections/RequestForm";

const features = [
  { icon: Calendar, key: "booking" },
  { icon: Stethoscope, key: "consultations" },
  { icon: Plane, key: "travel" },
] as const;

export function HeroRequestPanel() {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:block w-full max-w-sm shrink-0 lg:mt-32">
      <div className="glass rounded-2xl border border-white/15 shadow-2xl shadow-kz-blue/10 overflow-hidden">
        <div className="bg-gradient-to-r from-navy-900/90 to-kz-blue-dark/90 px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-kz-gold/20 border border-kz-gold/30 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-kz-gold" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-kz-gold">
                {t("callCenter.badge")}
              </p>
              <h2 className="text-sm font-bold text-white leading-snug">{t("callCenter.title")}</h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {features.map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-1 text-white/80">
                <Icon className="w-3 h-3 text-kz-blue-light shrink-0" />
                <span className="text-[10px] font-medium">{t(`callCenter.features.${key}`)}</span>
              </div>
            ))}
          </div>

          <a
            href="tel:1717"
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-kz-gold text-navy-900 text-xs font-bold rounded-lg hover:bg-[#f5b800] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {t("callCenter.callLabel")}: 1717
          </a>
        </div>

        <div className="px-5 py-4 bg-navy-900/60">
          <h3 className="text-sm font-bold text-white mb-0.5">{t("requestForm.title")}</h3>
          <p className="text-[11px] text-white/60 mb-3 leading-relaxed">{t("requestForm.subtitle")}</p>
          <RequestForm compact />
        </div>
      </div>
    </div>
  );
}
