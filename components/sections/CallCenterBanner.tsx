"use client";

import { Phone, Calendar, Stethoscope, Plane } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const features = [
  { icon: Calendar, key: "booking" },
  { icon: Stethoscope, key: "consultations" },
  { icon: Plane, key: "travel" },
] as const;

export function CallCenterBanner({ embedded = false }: { embedded?: boolean }) {
  const { t } = useTranslation();

  return (
    <section
      className={
        embedded
          ? "absolute bottom-0 inset-x-0 z-20 pb-[env(safe-area-inset-bottom)]"
          : "relative z-10 -mt-1"
      }
    >
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-kz-blue-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(254,195,16,0.12),transparent_55%)]" />
        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 ${
            embedded ? "py-3 sm:py-3 lg:py-3" : "py-4 sm:py-5"
          }`}
        >
          <div
            className={`flex ${
              embedded
                ? "flex-col gap-3 sm:gap-3 lg:flex-row lg:items-center lg:justify-between"
                : "flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
            }`}
          >
            <div className={`flex items-center shrink-0 min-w-0 ${embedded ? "gap-2.5" : "gap-4"}`}>
              <div
                className={`rounded-xl bg-kz-gold/20 border border-kz-gold/30 flex items-center justify-center shrink-0 ${
                  embedded ? "w-9 h-9 sm:w-10 sm:h-10" : "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl"
                }`}
              >
                <Phone
                  className={
                    embedded ? "w-4 h-4 sm:w-[18px] sm:h-[18px] text-kz-gold" : "w-6 h-6 sm:w-7 sm:h-7 text-kz-gold"
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`font-bold uppercase text-kz-gold mb-0.5 ${
                    embedded
                      ? "text-[9px] sm:text-[10px] tracking-wider"
                      : "text-[11px] sm:text-xs tracking-widest mb-1"
                  }`}
                >
                  {t("callCenter.badge")}
                </p>
                <h2
                  className={`font-bold text-white leading-snug ${
                    embedded
                      ? "text-[12px] sm:text-[13px] lg:text-sm"
                      : "text-base sm:text-lg"
                  }`}
                >
                  {t("callCenter.title")}
                </h2>
              </div>
            </div>

            <div
              className={`${
                embedded
                  ? "grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 lg:gap-8"
                  : "flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8"
              }`}
            >
              {features.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className={`flex items-center text-white/85 min-w-0 ${
                    embedded ? "gap-1 justify-center sm:justify-start" : "gap-1.5"
                  }`}
                >
                  <Icon
                    className={`text-kz-blue-light shrink-0 ${embedded ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-4 h-4"}`}
                  />
                  <span
                    className={`font-medium leading-tight ${
                      embedded
                        ? "text-[9px] sm:text-[10px] lg:text-[11px] text-center sm:text-left"
                        : "text-[12px] sm:text-[13px] whitespace-nowrap"
                    }`}
                  >
                    {t(`callCenter.features.${key}`)}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="tel:1717"
              className={`inline-flex items-center justify-center bg-kz-gold text-navy-900 font-bold shadow-lg shadow-kz-gold/25 hover:bg-[#f5b800] transition-colors shrink-0 ${
                embedded
                  ? "gap-1.5 w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs sm:text-sm lg:px-3.5 lg:py-2 lg:text-xs"
                  : "gap-2.5 px-6 py-3 rounded-xl text-sm"
              }`}
            >
              <Phone className={embedded ? "w-3.5 h-3.5" : "w-4 h-4"} />
              {t("callCenter.callLabel")}: 1717
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
