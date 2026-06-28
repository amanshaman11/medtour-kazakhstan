export const procedureCities = ["almaty", "astana", "shymkent"] as const;
export type ProcedureCity = (typeof procedureCities)[number];

export const procedureCategoryIds = [
  "check-up",
  "ct",
  "mri",
  "ultrasound",
  "dentistry",
  "xray",
  "massage",
  "functional-diagnostics",
  "treatment-room",
  "certificates",
] as const;

export const specialtyCategoryIds = [
  "cardiology",
  "gynecology",
  "neurology",
  "orthopedics",
  "ophthalmology",
  "urology",
  "surgery",
  "pediatrics",
  "dermatology",
  "endocrinology",
] as const;

export type ProcedureCategoryId =
  | (typeof procedureCategoryIds)[number]
  | (typeof specialtyCategoryIds)[number];

export interface ProcedureItem {
  id: string;
  categoryId: ProcedureCategoryId;
  priceKzt: number;
}

export const procedures: ProcedureItem[] = [
  // Check-up
  { id: "cardio-checkup", categoryId: "check-up", priceKzt: 41500 },
  { id: "full-body-ct-checkup", categoryId: "check-up", priceKzt: 123000 },
  { id: "full-body-mri-checkup", categoryId: "check-up", priceKzt: 102000 },
  { id: "womens-checkup", categoryId: "check-up", priceKzt: 25000 },
  { id: "mens-checkup", categoryId: "check-up", priceKzt: 22000 },
  { id: "executive-checkup", categoryId: "check-up", priceKzt: 185000 },
  // CT
  { id: "ct-head", categoryId: "ct", priceKzt: 18500 },
  { id: "ct-chest", categoryId: "ct", priceKzt: 21000 },
  { id: "ct-abdomen", categoryId: "ct", priceKzt: 24000 },
  { id: "ct-full-body", categoryId: "ct", priceKzt: 123000 },
  { id: "ct-angiography", categoryId: "ct", priceKzt: 45000 },
  // MRI
  { id: "mri-brain", categoryId: "mri", priceKzt: 32000 },
  { id: "mri-spine", categoryId: "mri", priceKzt: 38000 },
  { id: "mri-joint", categoryId: "mri", priceKzt: 35000 },
  { id: "mri-full-body", categoryId: "mri", priceKzt: 102000 },
  { id: "mri-cardiac", categoryId: "mri", priceKzt: 85000 },
  // Ultrasound
  { id: "us-abdomen", categoryId: "ultrasound", priceKzt: 8500 },
  { id: "us-thyroid", categoryId: "ultrasound", priceKzt: 7000 },
  { id: "us-pregnancy", categoryId: "ultrasound", priceKzt: 12000 },
  { id: "us-doppler", categoryId: "ultrasound", priceKzt: 15000 },
  { id: "us-heart", categoryId: "ultrasound", priceKzt: 14000 },
  // Dentistry
  { id: "dental-implant", categoryId: "dentistry", priceKzt: 180000 },
  { id: "dental-crown", categoryId: "dentistry", priceKzt: 95000 },
  { id: "teeth-whitening", categoryId: "dentistry", priceKzt: 45000 },
  { id: "dental-cleaning", categoryId: "dentistry", priceKzt: 15000 },
  { id: "root-canal", categoryId: "dentistry", priceKzt: 55000 },
  // X-Ray
  { id: "xray-chest", categoryId: "xray", priceKzt: 4500 },
  { id: "xray-spine", categoryId: "xray", priceKzt: 5500 },
  { id: "xray-dental", categoryId: "xray", priceKzt: 3500 },
  { id: "xray-joint", categoryId: "xray", priceKzt: 5000 },
  // Massage
  { id: "therapeutic-massage", categoryId: "massage", priceKzt: 12000 },
  { id: "sports-massage", categoryId: "massage", priceKzt: 14000 },
  { id: "lymphatic-massage", categoryId: "massage", priceKzt: 16000 },
  { id: "recovery-massage", categoryId: "massage", priceKzt: 15000 },
  // Functional diagnostics
  { id: "ecg", categoryId: "functional-diagnostics", priceKzt: 5000 },
  { id: "holter-monitor", categoryId: "functional-diagnostics", priceKzt: 18000 },
  { id: "spirometry", categoryId: "functional-diagnostics", priceKzt: 7500 },
  { id: "stress-test", categoryId: "functional-diagnostics", priceKzt: 22000 },
  // Treatment room
  { id: "iv-therapy", categoryId: "treatment-room", priceKzt: 8000 },
  { id: "injection-therapy", categoryId: "treatment-room", priceKzt: 6000 },
  { id: "wound-dressing", categoryId: "treatment-room", priceKzt: 4500 },
  // Certificates
  { id: "medical-certificate", categoryId: "certificates", priceKzt: 5000 },
  { id: "fitness-certificate", categoryId: "certificates", priceKzt: 6000 },
  { id: "travel-medical-cert", categoryId: "certificates", priceKzt: 7500 },
  // Specialties
  { id: "cardio-consultation", categoryId: "cardiology", priceKzt: 15000 },
  { id: "echo-cardiogram", categoryId: "cardiology", priceKzt: 18000 },
  { id: "gyno-consultation", categoryId: "gynecology", priceKzt: 12000 },
  { id: "pap-smear", categoryId: "gynecology", priceKzt: 9000 },
  { id: "neuro-consultation", categoryId: "neurology", priceKzt: 16000 },
  { id: "eeg", categoryId: "neurology", priceKzt: 14000 },
  { id: "ortho-consultation", categoryId: "orthopedics", priceKzt: 14000 },
  { id: "joint-injection", categoryId: "orthopedics", priceKzt: 25000 },
  { id: "eye-exam", categoryId: "ophthalmology", priceKzt: 10000 },
  { id: "lasik-consultation", categoryId: "ophthalmology", priceKzt: 15000 },
  { id: "urology-consultation", categoryId: "urology", priceKzt: 13000 },
  { id: "prostate-screening", categoryId: "urology", priceKzt: 18000 },
  { id: "general-surgery-consult", categoryId: "surgery", priceKzt: 15000 },
  { id: "hernia-repair", categoryId: "surgery", priceKzt: 350000 },
  { id: "pediatric-consultation", categoryId: "pediatrics", priceKzt: 11000 },
  { id: "child-vaccination", categoryId: "pediatrics", priceKzt: 8000 },
  { id: "dermatology-consultation", categoryId: "dermatology", priceKzt: 12000 },
  { id: "skin-biopsy", categoryId: "dermatology", priceKzt: 22000 },
  { id: "endocrinology-consultation", categoryId: "endocrinology", priceKzt: 14000 },
  { id: "thyroid-panel", categoryId: "endocrinology", priceKzt: 16000 },
];

const cityPriceMultiplier: Record<ProcedureCity, number> = {
  almaty: 1,
  astana: 1.05,
  shymkent: 0.92,
};

export function isProcedureCity(value: string): value is ProcedureCity {
  return procedureCities.includes(value as ProcedureCity);
}

export function isProcedureCategory(value: string): value is ProcedureCategoryId {
  return (
    procedureCategoryIds.includes(value as (typeof procedureCategoryIds)[number]) ||
    specialtyCategoryIds.includes(value as (typeof specialtyCategoryIds)[number])
  );
}

export function getProcedurePriceKzt(
  procedure: ProcedureItem,
  city: ProcedureCity
): number {
  return Math.round(procedure.priceKzt * cityPriceMultiplier[city]);
}

export function getProceduresByCategory(categoryId: ProcedureCategoryId): ProcedureItem[] {
  return procedures.filter((p) => p.categoryId === categoryId);
}

export function getProcedure(
  categoryId: ProcedureCategoryId,
  procedureId: string
): ProcedureItem | undefined {
  return procedures.find(
    (p) => p.categoryId === categoryId && p.id === procedureId
  );
}

export function getTotalProcedureCount(): number {
  return procedures.length;
}

export function getAllCategoryIds(): ProcedureCategoryId[] {
  return [...procedureCategoryIds, ...specialtyCategoryIds];
}
