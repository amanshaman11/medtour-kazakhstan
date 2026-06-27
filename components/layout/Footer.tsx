"use client";

import { HeartPulse, Mail, MapPin, Building2, Hotel, Plane, Compass, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const footerColumns = [
  {
    titleKey: "footer.platform",
    links: [
      { key: "footer.hospitalSearch", href: "#search" },
      { key: "footer.treatmentCategories", href: "#treatments" },
      { key: "footer.partnerHospitals", href: "#search" },
      { key: "footer.medicalPackages", href: "#packages" },
    ],
  },
  {
    titleKey: "footer.services",
    links: [
      { key: "footer.hotels", href: "#hotels" },
      { key: "footer.tourism", href: "#city-selection" },
      { key: "nav.concierge", href: "#concierge" },
      { key: "footer.contactCenterLink", href: "tel:1717" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { key: "footer.about", href: "#" },
      { key: "footer.howItWorks", href: "#how-it-works" },
      { key: "footer.why", href: "#why-kazakhstan" },
      { key: "footer.partnerWithUs", href: "#" },
    ],
  },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-950 border-t border-kz-blue/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-kz-blue/5 via-transparent to-kz-gold/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="py-10 border-b border-white/5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {[
              { icon: Building2, labelKey: "footer.serviceTypes.hospitals" },
              { icon: Globe, labelKey: "footer.serviceTypes.translation" },
              { icon: Hotel, labelKey: "footer.serviceTypes.hotels" },
              { icon: Plane, labelKey: "footer.serviceTypes.transportation" },
              { icon: Compass, labelKey: "footer.serviceTypes.tourism" },
            ].map((service) => (
              <div key={service.labelKey} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kz-blue/10 border border-kz-blue/20 mb-3">
                  <service.icon className="w-6 h-6 text-kz-blue" />
                </div>
                <p className="text-xs text-white/70">{t(service.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-kz flex items-center justify-center">
                <HeartPulse className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-white font-semibold text-[15px]">MedTour Kazakhstan</span>
            </a>
            <p className="text-[13px] text-white/55 leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2.5">
              <a
                href="mailto:contact@medtour.kz"
                className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                contact@medtour.kz
              </a>
              <p className="flex items-center gap-2 text-[13px] text-white/50">
                <MapPin className="w-3.5 h-3.5 rtl-flip" />
                {t("cities.almaty")} · {t("cities.astana")} · {t("cities.shymkent")}
              </p>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-[13px] font-semibold text-white mb-4">{t(col.titleKey)}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/55 hover:text-kz-blue-light transition-colors"
                    >
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/45">
            © {new Date().getFullYear()} MedTour Kazakhstan. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
            <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">
              {t("footer.disclaimer")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
