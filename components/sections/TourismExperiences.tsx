"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { tourismCities } from "@/lib/data/tourism";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const cityImages: Record<string, string> = {
  almaty: "/images/almaty.jpg",
  astana: "/images/astana.jpg",
  shymkent: "/images/shymkent.jpg",
};

export function TourismExperiences() {
  const { t, ta } = useTranslation();

  return (
    <section id="tourism" className="py-14 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            badge={t("tourism.badge")}
            title={t("tourism.title")}
            subtitle={t("tourism.subtitle")}
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6">
          {tourismCities.map((city, i) => (
            <AnimatedSection key={city.id} delay={i * 0.1}>
              <m.div
                whileHover={{ y: -5 }}
                className="group h-full rounded-xl overflow-hidden border border-border bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="h-44 p-6 flex flex-col justify-end relative overflow-hidden">
                  <Image
                    src={cityImages[city.id]}
                    alt={t(`tourism.items.${city.id}.city`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <p className="text-[13px] text-white/80 font-medium relative">
                    {t(`tourism.items.${city.id}.tagline`)}
                  </p>
                  <h3 className="text-2xl font-bold text-white relative drop-shadow-sm">
                    {t(`tourism.items.${city.id}.city`)}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {t(`tourism.items.${city.id}.description`)}
                  </p>

                  <p className="text-[11px] font-semibold text-navy-700 uppercase tracking-wider mb-3">
                    {t("tourism.attractionsLabel")}
                  </p>
                  <ul className="space-y-2.5 mb-5">
                    {ta(`tourism.items.${city.id}.attractions`).map((attraction) => (
                      <li
                        key={attraction}
                        className="flex items-center gap-2.5 text-[13px] text-navy-800"
                      >
                        <MapPin className="w-3.5 h-3.5 text-navy-400 shrink-0 rtl-flip" />
                        {attraction}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#packages"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-700 hover:gap-2.5 transition-all"
                  >
                    {t("tourism.viewPackages")}
                    <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                  </a>
                </div>
              </m.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
