"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { MapPin, Star, ExternalLink } from "lucide-react";
import { hotels } from "@/lib/data/hotels";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

export function HotelsAccommodation() {
  const { t } = useTranslation();

  return (
    <section id="hotels" className="py-14 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("hotels.badge")}
            title={t("hotels.title")}
            subtitle={t("hotels.subtitle")}
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels.map((hotel, i) => (
            <AnimatedSection key={hotel.id} delay={i * 0.06}>
              <m.div
                whileHover={{ y: -4 }}
                className="group h-full rounded-xl bg-white border border-border overflow-hidden hover:shadow-lg hover:border-navy-200 transition-all duration-300"
              >
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-36 p-5 flex flex-col justify-between relative overflow-hidden"
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/10" />
                  <div className="relative flex items-center gap-0.5">
                    {Array.from({ length: hotel.stars }).map((_, s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <h3 className="text-[16px] font-semibold text-white drop-shadow-sm">
                      {hotel.name}
                    </h3>
                  </div>
                </a>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-[13px] text-muted mb-4">
                    <MapPin className="w-3.5 h-3.5 rtl-flip" />
                    {t(`cities.${hotel.city.toLowerCase()}`)} ·{" "}
                    {t(`hotels.items.${hotel.id}.distance`)}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hotel.amenityKeys.map((a) => (
                      <span
                        key={a}
                        className="px-2 py-0.5 rounded-md bg-navy-50 text-[11px] font-medium text-navy-700"
                      >
                        {t(`hotels.amenities.${a}`)}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-[11px] text-muted">
                        {t("hotels.priceRange")}
                      </p>
                      <p className="text-[15px] font-semibold text-navy-900">
                        {hotel.priceRange
                          .replace("Est.", t("common.est"))
                          .replace("/night", t("hotels.perNight"))}
                      </p>
                    </div>
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-navy-700 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                    >
                      {t("hotels.visitWebsite")}
                      <ExternalLink className="w-3.5 h-3.5 rtl-flip" />
                    </a>
                  </div>
                </div>
              </m.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
