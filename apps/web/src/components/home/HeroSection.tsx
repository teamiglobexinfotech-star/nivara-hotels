import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchImage } from "../shared/ArchImage";
import { BookingBar, type BookingSearchDetails } from "../BookingBar";

interface HeroSectionProps {
  onOpenBooking: (room?: any, details?: BookingSearchDetails) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40 lg:pb-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-20 right-10 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Hero Content */}
        <div className="z-10 space-y-6 sm:space-y-8 lg:col-span-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase sm:text-[11px]">
              NIVARA HOTELS · JAIPUR
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-serif text-5xl leading-[1.08] font-normal tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-[76px]">
            Stay <br />
            somewhere <br />
            <span className="font-normal text-primary italic">worth</span>{" "}
            <br />
            remembering.
          </h1>

          {/* Subtext */}
          <p className="max-w-lg text-sm leading-relaxed font-light text-muted-foreground sm:text-base md:text-lg">
            Thoughtfully designed rooms, quiet spaces, and warm hospitality come
            together for a stay that feels effortlessly yours.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
            <Button
              variant="luxury"
              size="luxuryLg"
              onClick={() => navigate("/rooms")}
            >
              <span>Explore Rooms</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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

          {/* Trust Pill / Rating badge */}
          <div className="flex items-center gap-3 pt-4 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Patron"
                className="h-7 w-7 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Patron"
                className="h-7 w-7 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                alt="Patron"
                className="h-7 w-7 rounded-full border-2 border-background object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="font-medium text-foreground">4.98</span>
              <span className="text-muted-foreground/70">
                · Welcoming discerning travelers in Jaipur
              </span>
            </div>
          </div>
        </div>

        {/* Right Hero Arch Image Frame */}
        <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Primary Arch Image */}
            <ArchImage
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
              alt="Nivara Courtyard Atrium with illuminated pool arches"
              aspectRatio="aspect-[4/5]"
              caption="Courtyard Atrium"
              subcaption="Evening Reflection Pool · Amber Foothills"
              badge="SANCTUARY I"
              badgePosition="top-right"
            />

            {/* Overlapping Suite Card */}
            <div className="absolute -bottom-8 -left-4 z-20 w-44 shadow-2xl sm:-bottom-10 sm:-left-8 sm:w-56">
              <div className="overflow-hidden rounded-2xl border border-border bg-background p-1">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-card">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
                    alt="Heritage Suite"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute right-2 bottom-2 left-2 flex items-center justify-between text-[10px]">
                    <div>
                      <p className="font-serif font-medium text-foreground">
                        Heritage Suite
                      </p>
                      <p className="text-[9px] text-primary">₹28,000 / night</p>
                    </div>
                    <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                      ★ 5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Booking Search Bar across bottom */}
      <div className="mt-16 sm:mt-20">
        <BookingBar onSearch={(details) => onOpenBooking(undefined, details)} />
      </div>
    </section>
  );
};
