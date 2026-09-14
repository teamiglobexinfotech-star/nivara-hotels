import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onOpenBooking: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            Begin Your Journey
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-foreground tracking-tight leading-[1.15]">
          Your next unforgettable stay <br className="hidden sm:inline" />
          <span className="italic text-primary">begins here.</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Come for the destination. Stay for the feeling. We invite you to experience hospitality stripped of haste and steeped in quiet luxury.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="luxury"
            size="luxuryLg"
            onClick={onOpenBooking}
            className="group"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            variant="luxuryOutline"
            size="luxuryLg"
            onClick={() => navigate('/rooms')}
          >
            Explore Rooms
          </Button>
        </div>
      </div>
    </section>
  );
};
