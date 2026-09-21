import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ArchImage } from "../../../components/shared/ArchImage";
import { SectionHeading } from "../../../components/shared/SectionHeading";

export const HotelIntroduction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Arch-Shaped Hotel Grand Lounge Image */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <ArchImage
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
              alt="A classic view of the Grand Lounge at Nivara Hotels"
              aspectRatio="aspect-[3/4]"
              caption="A classic view of the Grand Lounge"
              subcaption="Amber Ridge, Jaipur · Hand-carved sandstone arches"
              doubleRing={true}
            />
          </div>
        </div>

        {/* Right Column: Editorial Philosophy & Metrics */}
        <div className="order-1 space-y-8 lg:order-2 lg:col-span-7">
          <SectionHeading
            eyebrow="The Nivara Experience"
            title="A quieter kind"
            italicWord="of luxury."
            subtitle="We believe genuine luxury doesn't proclaim itself; it envelops you in effortless calm. Nivara was conceived as a respite from visual noise—a boutique hotel in Jaipur where tactile materials, morning stillness, and intuitive personal service coalesce."
          />

          <p className="text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
            Each private room and suite honors the cadence of rest: days are
            measured not by schedules, but by the soft angle of the morning sun
            crossing hand-finished lime-plaster walls, private courtyards, and
            the aroma of single-estate tisanes.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 border-t border-b border-border py-6 pt-4">
            <div>
              <span className="block font-serif text-3xl font-normal text-foreground sm:text-4xl lg:text-5xl">
                32
              </span>
              <span className="mt-1 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
                Rooms & Suites
              </span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-normal text-primary sm:text-4xl lg:text-5xl">
                98%
              </span>
              <span className="mt-1 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
                Delighted Guests
              </span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-normal text-foreground sm:text-4xl lg:text-5xl">
                03
              </span>
              <span className="mt-1 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
                Design Honors
              </span>
            </div>
          </div>

          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/about")}
              className="group inline-flex h-auto items-center gap-2 p-0 text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:bg-transparent hover:text-primary"
            >
              <span>Discover Nivara</span>
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
