import { clinics } from "./clinics";
import type { TreatmentCategory } from "./types";
import type { ProcedureCategoryId, ProcedureCity } from "./procedures";

const procedureCityToClinicCity: Record<ProcedureCity, string> = {
  almaty: "Almaty",
  astana: "Astana",
  shymkent: "Shymkent",
};

const procedureToClinicCategories: Partial<
  Record<ProcedureCategoryId, TreatmentCategory[]>
> = {
  dentistry: ["dental"],
  cardiology: ["cardiology"],
  orthopedics: ["orthopedics"],
  gynecology: ["ivf"],
};

const diagnosticProcedureCategories: ProcedureCategoryId[] = [
  "check-up",
  "ct",
  "mri",
  "ultrasound",
  "xray",
  "functional-diagnostics",
  "certificates",
  "treatment-room",
  "massage",
  "neurology",
  "ophthalmology",
  "urology",
  "surgery",
  "pediatrics",
  "dermatology",
  "endocrinology",
];

const diagnosticClinicIds: Partial<Record<ProcedureCity, string[]>> = {
  almaty: [
    "national-hospital-almaty",
    "syzganov-surgery-center",
    "mediker-hospital-almaty",
    "american-medical-centers-almaty",
  ],
  astana: [
    "umc-heart-center",
    "national-scientific-medical-center",
    "umc-mother-child",
    "alanda-clinic-astana",
  ],
  shymkent: [
    "shymkent-heart-center",
    "shymkent-diagnostic-center",
    "ekomed-ivf-shymkent",
  ],
};

export function getClinicsForProcedure(
  city: ProcedureCity,
  categoryId: ProcedureCategoryId
) {
  const cityName = procedureCityToClinicCity[city];
  const inCity = clinics.filter((clinic) => clinic.city === cityName);

  const mappedCategories = procedureToClinicCategories[categoryId];
  if (mappedCategories) {
    const matched = inCity.filter((clinic) =>
      mappedCategories.some((cat) => clinic.categories.includes(cat))
    );
    if (matched.length > 0) return matched;
  }

  if (diagnosticProcedureCategories.includes(categoryId)) {
    const preferredIds = diagnosticClinicIds[city] ?? [];
    const preferred = inCity.filter((clinic) => preferredIds.includes(clinic.id));
    return preferred.length > 0 ? preferred : inCity;
  }

  return inCity;
}
