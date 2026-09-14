import React from 'react';
import { Waves, Sparkles, Activity, Bell, Wifi, Car } from 'lucide-react';
import { SectionHeading } from '../shared/SectionHeading';
import { AMENITIES_DATA } from '../../data';

export const AmenitiesSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <SectionHeading
          eyebrow="Hotel Amenities"
          title="Everything considered"
          italicWord="for your stay."
          align="center"
          subtitle="We eschew generic hotel conventions in favor of deeply personal, meticulously considered sensory amenities and effortless comfort."
        />
      </div>

      {/* 6 Grid blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AMENITIES_DATA.map((amenity) => {
          const IconComponent =
            amenity.iconName === 'Waves'
              ? Waves
              : amenity.iconName === 'Sparkles'
              ? Sparkles
              : amenity.iconName === 'Activity'
              ? Activity
              : amenity.iconName === 'Bell'
              ? Bell
              : amenity.iconName === 'Wifi'
              ? Wifi
              : Car;

          return (
            <div
              key={amenity.id}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-card-foreground group-hover:text-primary transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-muted-foreground leading-relaxed">
                  {amenity.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                <span>Sanctuary Service</span>
                <span className="text-primary font-semibold">{amenity.tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
