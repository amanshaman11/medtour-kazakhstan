import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";
import { WhyKazakhstan } from "@/components/sections/WhyKazakhstan";
import { PlatformFeatures } from "@/components/sections/PlatformFeatures";
import { TreatmentSearch } from "@/components/sections/TreatmentSearch";
import { MedicalConcierge } from "@/components/sections/MedicalConcierge";
import { TreatmentCategories } from "@/components/sections/TreatmentCategories";
import { PartnerHospitals } from "@/components/sections/PartnerHospitals";
import { HotelsAccommodation } from "@/components/sections/HotelsAccommodation";
import { MedicalTravelPackages } from "@/components/sections/MedicalTravelPackages";
import { TourismExperiences } from "@/components/sections/TourismExperiences";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { ContactCenter } from "@/components/sections/ContactCenter";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <WhyKazakhstan />
        <PlatformFeatures />
        <TreatmentSearch />
        <MedicalConcierge />
        <TreatmentCategories />
        <PartnerHospitals />
        <HotelsAccommodation />
        <MedicalTravelPackages />
        <TourismExperiences />
        <HowItWorks />
        <TrustIndicators />
        <ContactCenter />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
