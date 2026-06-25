"use client";

import { HeartPulse, Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const footerColumns = [
  {
    titleKey: "footer.platform",
    links: [
      { key: "footer.hospitalSearch", href: "#search" },
      { key: "footer.treatmentCategories", href: "#treatments" },
      { key: "footer.partnerHospitals", href: "#partners" },
      { key: "footer.medicalPackages", href: "#packages" },
    ],
  },
  {
    titleKey: "footer.services",
    links: [
      { key: "footer.hotels", href: "#hotels" },
      { key: "footer.tourism", href: "#tourism" },
      { key: "nav.concierge", href: "#concierge" },
      { key: "footer.contactCenter", href: "#contact-center" },
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
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center">
                <HeartPulse className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-white font-semibold text-[15px]">
                MedTour Kazakhstan
              </span>
            </a>
            <p className="text-[13px] text-white/55 leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:1717"
                className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {t("footer.contactLine")}
              </a>
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
              <h4 className="text-[13px] font-semibold text-white mb-4">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/55 hover:text-white transition-colors"
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
