export type TreatmentCategory =
  | "dental"
  | "ivf"
  | "cardiology"
  | "plastic-surgery"
  | "orthopedics";

export interface Clinic {
  id: string;
  name: string;
  city: string;
  specialty: string;
  specialtyKey: string;
  categories: TreatmentCategory[];
  accreditation: string;
  accreditationKey: string;
  accredited: boolean;
  phone?: string;
  email?: string;
  website?: string;
  priceRange: string;
  rating: number;
  reviews: number;
}

export interface PartnerHospital {
  id: string;
  name: string;
  city: string;
  focus: string;
  accreditation: string;
  accreditationKey: string;
  established?: string;
  website?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  stars: number;
  priceRange: string;
  distanceFromHospital: string;
  amenityKeys: string[];
  amenities: string[];
  image: string;
  website: string;
}

export interface TravelPackage {
  id: string;
  name: string;
  days: number;
  price: string;
  includes: string[];
  popular?: boolean;
}

export interface TourismCity {
  id: string;
  city: string;
  tagline: string;
  description: string;
  attractions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  treatment: string;
  quote: string;
  rating: number;
}

export interface ConciergeScenario {
  id: string;
  patientMessage: string;
  response: {
    title: string;
    clinics: string[];
    priceRange?: string;
    hotels?: string[];
    packages?: string[];
    interpreter: string;
    contact: string;
  };
}
