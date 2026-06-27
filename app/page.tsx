import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageAmbience } from "@/components/ui/PageAmbience";
import { Hero } from "@/components/sections/Hero";
import { CitySelection } from "@/components/sections/CitySelection";
import { WhyChooseKazakhstan } from "@/components/sections/WhyChooseKazakhstan";
import { Statistics } from "@/components/sections/Statistics";
import { PlatformFeatures } from "@/components/sections/PlatformFeatures";
import { TreatmentSearch } from "@/components/sections/TreatmentSearch";
import { MedicalConcierge } from "@/components/sections/MedicalConcierge";
import { TreatmentCategories } from "@/components/sections/TreatmentCategories";
import { HotelsAccommodation } from "@/components/sections/HotelsAccommodation";
import { MedicalTravelPackages } from "@/components/sections/MedicalTravelPackages";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <PageAmbience />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <CitySelection />
        <WhyChooseKazakhstan />
        <Statistics />
        <PlatformFeatures />
        <TreatmentSearch />
        <MedicalConcierge />
        <TreatmentCategories />
        <HotelsAccommodation />
        <MedicalTravelPackages />
        <HowItWorks />
        <TrustIndicators />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
