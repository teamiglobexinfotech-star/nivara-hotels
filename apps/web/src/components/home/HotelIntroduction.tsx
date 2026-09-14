import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../shared/SectionHeading';
import { ArchImage } from '../shared/ArchImage';
import { Button } from '@/components/ui/button';

export const HotelIntroduction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Arch-Shaped Hotel Grand Lounge Image */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative max-w-md mx-auto">
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
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
          <SectionHeading
            eyebrow="The Nivara Experience"
            title="A quieter kind"
            italicWord="of luxury."
            subtitle="We believe genuine luxury doesn't proclaim itself; it envelops you in effortless calm. Nivara was conceived as a respite from visual noise—a boutique hotel in Jaipur where tactile materials, morning stillness, and intuitive personal service coalesce."
          />

          <p className="text-sm sm:text-base font-light leading-relaxed text-muted-foreground">
            Each private room and suite honors the cadence of rest: days are measured not by schedules, but by the soft angle of the morning sun crossing hand-finished lime-plaster walls, private courtyards, and the aroma of single-estate tisanes.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-b border-border py-6">
            <div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal block">
                32
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1 block">
                Rooms & Suites
              </span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-normal block">
                98%
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1 block">
                Delighted Guests
              </span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal block">
                03
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1 block">
                Design Honors
              </span>
            </div>
          </div>

          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/about')}
              className="group inline-flex items-center gap-2 p-0 h-auto text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:text-primary hover:bg-transparent transition-colors"
            >
              <span>Discover Nivara</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
