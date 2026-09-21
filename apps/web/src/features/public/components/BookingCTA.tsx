import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface BookingCTAProps {
  onOpenBooking: () => void;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-t border-border px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
      {/* Background Arch Overlay Image with Soft Luxury Gradient */}
      <div className="absolute inset-0 z-0 opacity-100">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
          alt="Nivara Hotels evening ambiance"
          className="h-full w-full object-cover blur-[2px] filter"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase sm:text-[11px]">
            Reservations · Nivara Hotels
          </span>
        </div>

        <h2 className="font-serif text-4xl leading-[1.14] font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Your next stay begins at <br />
          <span className="font-normal text-primary italic">Nivara.</span>
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-light text-muted-foreground sm:text-base md:text-lg">
          Discover a considered stay where comfort, character, and thoughtful
          hospitality come together.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button
            variant="luxury"
            size="luxuryLg"
            onClick={() => navigate("/rooms")}
          >
            <span>Explore Rooms</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="luxuryOutline"
            size="luxuryLg"
            onClick={onOpenBooking}
          >
            <span>Book a Stay</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
