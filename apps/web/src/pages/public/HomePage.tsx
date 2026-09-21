import React from "react";

import type { BookingSearchDetails } from "@/components/BookingBar";
import { AmenitiesSection } from "@/features/public/components/AmenitiesSection";
import { BookingCTA } from "@/features/public/components/BookingCTA";
import { ContactPreview } from "@/features/public/components/ContactPreview";
import { FAQSection } from "@/features/public/components/FAQSection";
import { FeaturedRooms } from "@/features/public/components/FeaturedRooms";
import { HeroSection } from "@/features/public/components/HeroSection";
import { HotelIntroduction } from "@/features/public/components/HotelIntroduction";
import { TestimonialsSection } from "@/features/public/components/TestimonialsSection";
import { WhyNivara } from "@/features/public/components/WhyNivara";
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
