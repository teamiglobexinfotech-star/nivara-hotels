import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '../shared/SectionHeading';
import { ArchImage } from '../shared/ArchImage';
import { HOTEL_CONTACT } from '../../data';

interface ContactPreviewProps {
  onOpenBooking: () => void;
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Information */}
        <div className="lg:col-span-6 space-y-8">
          <SectionHeading
            eyebrow="Direct Reservations"
            title="Planning your"
            italicWord="stay?"
            subtitle="Have a question about a room, arrival time, or special request? Our reservations team is here to help."
          />

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-primary shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Direct Reservations Telephone
                </p>
                <p className="text-sm font-serif font-medium text-foreground">
                  {HOTEL_CONTACT.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-primary shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Electronic Correspondence
                </p>
                <p className="text-sm font-serif font-medium text-foreground">
                  {HOTEL_CONTACT.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Hotel Address
                </p>
                <p className="text-sm text-foreground">
                  {HOTEL_CONTACT.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="luxury"
              size="luxuryMd"
              onClick={() => navigate('/contact')}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="luxuryOutline"
              size="luxuryMd"
              onClick={onOpenBooking}
            >
              <span>Book a Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <ArchImage
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
              alt="The West Gate Cloister at Nivara Hotels"
              aspectRatio="aspect-[4/5]"
              caption="The West Gate Cloister"
              subcaption="Evening Lantern Approach · Private Valet Entrance"
              badge="VALET CLOISTER"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
