import React from "react";
import type { BookingSearchDetails } from "@/components/BookingBar";
import { AmenitiesSection } from "@/components/home/AmenitiesSection";
import { BookingCTA } from "@/components/home/BookingCTA";
import { ContactPreview } from "@/components/home/ContactPreview";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { HeroSection } from "@/components/home/HeroSection";
import { HotelIntroduction } from "@/components/home/HotelIntroduction";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyNivara } from "@/components/home/WhyNivara";
import type { Room } from "@/types";

interface HomePageProps {
  onOpenBooking: (room?: Room, details?: BookingSearchDetails) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <HeroSection
        onOpenBooking={(room, details) => onOpenBooking(room, details)}
      />
      <HotelIntroduction />
      <FeaturedRooms onOpenBooking={onOpenBooking} />
      <AmenitiesSection />
      <WhyNivara />
      <TestimonialsSection />
      <FAQSection />
      <ContactPreview onOpenBooking={() => onOpenBooking()} />
      <BookingCTA onOpenBooking={() => onOpenBooking()} />
    </div>
  );
};
