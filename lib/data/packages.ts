import type { TravelPackage } from "./types";

export const travelPackages: TravelPackage[] = [
  {
    id: "5-day",
    name: "5 Day Medical Package",
    days: 5,
    price: "$2,800",
    includes: [
      "Treatment consultation & procedure",
      "4-star hotel accommodation",
      "Airport pickup & drop-off",
      "Professional interpreter",
      "City orientation tour",
    ],
  },
  {
    id: "7-day",
    name: "7 Day Medical Package",
    days: 7,
    price: "$4,200",
    popular: true,
    includes: [
      "Full treatment program",
      "5-star hotel accommodation",
      "Airport pickup & transfers",
      "Dedicated interpreter",
      "Follow-up appointments",
      "Local cultural tour",
    ],
  },
  {
    id: "14-day",
    name: "14 Day Medical Package",
    days: 14,
    price: "$7,500",
    includes: [
      "Comprehensive treatment plan",
      "Premium hotel accommodation",
      "All airport & clinic transfers",
      "24/7 interpreter support",
      "Recovery monitoring",
      "Multi-city tourism experiences",
      "Visa assistance included",
    ],
  },
];
