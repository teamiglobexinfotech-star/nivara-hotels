import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/features/public/components/AboutSection";
import { CTASection } from "@/features/public/components/CTASection";
import { FAQSection } from "@/features/public/components/FAQSection";
import { AmenitiesSection } from "@/features/public/components/FeaturesSection";
import { FooterSection } from "@/features/public/components/FooterSection";
import { HeroSection } from "@/features/public/components/HeroSection";
import { LocationSection } from "@/features/public/components/LocationSection";
import { RoomsSection } from "@/features/public/components/RoomsSection";
import { TestimonialsSection } from "@/features/public/components/Testimonials";

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <AmenitiesSection />
        <RoomsSection />
        <TestimonialsSection />
        <FAQSection />
        <LocationSection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
