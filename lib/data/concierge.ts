import type { ConciergeScenario } from "./types";

export const conciergeScenarios: ConciergeScenario[] = [
  {
    id: "dental",
    patientMessage: "I need dental implants.",
    response: {
      title: "Dental Implant Options in Almaty",
      clinics: [
        "Premium Dental Center — JCI Accredited",
        "Smile Dental Clinic — ISO 9001 Certified",
      ],
      priceRange: "Estimated treatment: $800 – $5,000 per implant",
      hotels: [
        "Holiday Inn Express — 3 min from clinic ($55/night)",
        "Rixos Almaty — 5-star recovery stay ($110/night)",
      ],
      interpreter: "English & Russian interpreters available daily",
      contact: "Call 1717 or contact@medtour.kz for booking",
    },
  },
  {
    id: "ivf",
    patientMessage: "I need IVF treatment.",
    response: {
      title: "IVF Treatment Centers",
      clinics: [
        "Almaty IVF Institute — ESHRE Standards",
        "Family IVF Center, Astana — 94% patient satisfaction",
      ],
      packages: [
        "7 Day IVF Package — from $4,200 (treatment + hotel + interpreter)",
        "14 Day Comprehensive Package — from $7,500",
      ],
      hotels: [
        "Rixos Almaty — recovery-friendly suites",
        "Sheraton Astana — adjacent to medical district",
      ],
      interpreter: "Multilingual coordinators: EN, RU, KZ, AR, CN",
      contact: "Dial 1717 for personalized treatment planning",
    },
  },
];
