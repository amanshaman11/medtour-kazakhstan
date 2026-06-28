"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Building2, Heart, Sparkles, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface City {
  id: string;
  image: string;
  icon: typeof Building2;
}

export function CitySelection() {
  const { t, ta } = useTranslation();

  const cities: City[] = [
    { id: "almaty", image: "/images/almaty.jpg", icon: Heart },
    { id: "astana", image: "/images/astana.jpg", icon: Building2 },
    { id: "shymkent", image: "/images/shymkent.jpg", icon: Sparkles },
  ];

  return (
    <section id="city-selection" className="py-20 lg:py-28 kz-section-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-light opacity-30" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-kz-blue/10 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-kz-gold/10 rounded-full blur-3xl translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full gradient-kz-badge text-white text-base sm:text-lg font-bold tracking-wide mb-8"
            >
              <MapPin className="w-5 h-5" />
              {t("citySelection.badge")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4"
            >
              {t("citySelection.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted max-w-2xl mx-auto"
            >
              {t("citySelection.subtitle")}
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cities.map((city, index) => {
            const Icon = city.icon;
            const attractions = ta(`tourism.items.${city.id}.attractions`);
            const strengths = ta(`citySelection.cities.${city.id}.strengths`);

            return (
              <AnimatedSection key={city.id} delay={index * 0.1}>
                <motion.a
                  href={`/procedures/${city.id}`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group block h-full"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 card-shine bg-white border border-border">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={city.image}
                        alt={t(`citySelection.cities.${city.id}.name`)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                      <div className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-xs font-medium text-kz-blue uppercase tracking-wider mb-1">
                          {t(`tourism.items.${city.id}.tagline`)}
                        </p>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                          {t(`citySelection.cities.${city.id}.name`)}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl-flip" />
                        </h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-muted leading-relaxed mb-5">
                        {t(`citySelection.cities.${city.id}.description`)}
                      </p>

                      <div className="mb-5">
                        <p className="text-xs font-semibold text-kz-blue uppercase tracking-wider mb-2">
                          {t("citySelection.medicalStrengths")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {strengths.map((strength) => (
                            <span
                              key={strength}
                              className="px-2.5 py-1 rounded-lg bg-navy-50 border border-border text-xs font-medium text-navy-700"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-kz-gold-dark uppercase tracking-wider mb-2">
                          {t("citySelection.attractions")}
                        </p>
                        <ul className="space-y-2">
                          {attractions.map((attraction) => (
                            <li
                              key={attraction}
                              className="flex items-start gap-2 text-[13px] text-navy-800"
                            >
                              <MapPin className="w-3.5 h-3.5 text-navy-400 shrink-0 mt-0.5 rtl-flip" />
                              {attraction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.a>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
