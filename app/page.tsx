import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HeroBackground } from "@/components/sections/HeroBackground";

const CitySelection = dynamic(() =>
  import("@/components/sections/CitySelection").then((m) => ({ default: m.CitySelection }))
);
const MedicalProcedures = dynamic(() =>
  import("@/components/sections/MedicalProcedures").then((m) => ({ default: m.MedicalProcedures }))
);
const WhyChooseKazakhstan = dynamic(() =>
  import("@/components/sections/WhyChooseKazakhstan").then((m) => ({
    default: m.WhyChooseKazakhstan,
  }))
);
const Statistics = dynamic(() =>
  import("@/components/sections/Statistics").then((m) => ({ default: m.Statistics }))
);
const PlatformFeatures = dynamic(() =>
  import("@/components/sections/PlatformFeatures").then((m) => ({ default: m.PlatformFeatures }))
);
const TreatmentSearch = dynamic(() =>
  import("@/components/sections/TreatmentSearch").then((m) => ({ default: m.TreatmentSearch }))
);
const MedicalConcierge = dynamic(() =>
  import("@/components/sections/MedicalConcierge").then((m) => ({ default: m.MedicalConcierge }))
);
const HotelsAccommodation = dynamic(() =>
  import("@/components/sections/HotelsAccommodation").then((m) => ({
    default: m.HotelsAccommodation,
  }))
);
const MedicalTravelPackages = dynamic(() =>
  import("@/components/sections/MedicalTravelPackages").then((m) => ({
    default: m.MedicalTravelPackages,
  }))
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((m) => ({ default: m.HowItWorks }))
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const FinalCTA = dynamic(() =>
  import("@/components/sections/FinalCTA").then((m) => ({ default: m.FinalCTA }))
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero background={<HeroBackground />} />
        <CitySelection />
        <MedicalProcedures />
        <WhyChooseKazakhstan />
        <Statistics />
        <PlatformFeatures />
        <TreatmentSearch />
        <MedicalConcierge />
        <HotelsAccommodation />
        <MedicalTravelPackages />
        <HowItWorks />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
