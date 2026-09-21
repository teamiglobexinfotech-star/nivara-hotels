import { Activity, Bell, Car, Sparkles, Waves, Wifi } from "lucide-react";
import React from "react";

import { SectionHeading } from "@/components/shared/SectionHeading";

import { AMENITIES_MOCK } from "../mock/amenity.mock";

export const AmenitiesSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
        <SectionHeading
          eyebrow="Hotel Amenities"
          title="Everything considered"
          italicWord="for your stay."
          align="center"
          subtitle="We eschew generic hotel conventions in favor of deeply personal, meticulously considered sensory amenities and effortless comfort."
        />
      </div>

      {/* 6 Grid blocks */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {AMENITIES_MOCK.map((amenity) => {
          const IconComponent =
            amenity.iconKey === "Waves"
              ? Waves
              : amenity.iconKey === "Sparkles"
                ? Sparkles
                : amenity.iconKey === "Activity"
                  ? Activity
                  : amenity.iconKey === "Bell"
                    ? Bell
                    : amenity.iconKey === "Wifi"
                      ? Wifi
                      : Car;

          return (
            <div
              key={amenity.id}
              className="group flex flex-col justify-between space-y-6 rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-card-foreground transition-colors group-hover:text-primary">
                  {amenity.name}
                </h3>
                <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
                  {amenity.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 text-[10px] tracking-[0.2em] text-muted-foreground/70 uppercase">
                <span>Sanctuary Service</span>
                <span className="font-semibold text-primary">
                  {amenity.iconKey}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
