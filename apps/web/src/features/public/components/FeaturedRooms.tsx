import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { RoomCard } from "@/components/RoomCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { ROOMS_DATA } from "@/data";
import type { Room } from "@/types";

interface FeaturedRoomsProps {
  onOpenBooking: (room?: Room) => void;
}

export const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({
  onOpenBooking,
}) => {
  const navigate = useNavigate();
  // 3 featured rooms: Nivara Deluxe, Heritage Suite, Signature Residence
  const featuredRooms = [ROOMS_DATA[0], ROOMS_DATA[1], ROOMS_DATA[4]];

  return (
    <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Private Accommodations"
          title="Rooms designed"
          italicWord="for lingering."
        />
        <p className="max-w-md text-xs leading-relaxed font-light text-muted-foreground sm:text-sm md:text-right">
          A curated collection of expansive sanctuaries, tailored with artisan
          millwork, acoustic solitude, and thoughtful hotel amenities.
        </p>
      </div>

      {/* 3 Featured Room Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredRooms.map((room, index) => (
          <RoomCard
            key={room.id}
            room={room}
            onSelect={(r) => onOpenBooking(r)}
            featured={index === 1} // Heritage Suite highlighted
          />
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-16 text-center">
        <Button
          variant="luxuryOutline"
          size="luxuryLg"
          onClick={() => navigate("/rooms")}
        >
          <span>View All Rooms</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </section>
  );
};
