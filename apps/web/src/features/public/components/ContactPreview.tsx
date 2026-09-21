import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ArchImage } from "@/components/shared/ArchImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { HOTEL_CONTACT } from "@/mock/app.mock";

interface ContactPreviewProps {
  onOpenBooking: () => void;
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({
  onOpenBooking,
}) => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Information */}
        <div className="space-y-8 lg:col-span-6">
          <SectionHeading
            eyebrow="Direct Reservations"
            title="Planning your"
            italicWord="stay?"
            subtitle="Have a question about a room, arrival time, or special request? Our reservations team is here to help."
          />

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Direct Reservations Telephone
                </p>
                <p className="font-serif text-sm font-medium text-foreground">
                  {HOTEL_CONTACT.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Electronic Correspondence
                </p>
                <p className="font-serif text-sm font-medium text-foreground">
                  {HOTEL_CONTACT.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Hotel Address
                </p>
                <p className="text-sm text-foreground">
                  {HOTEL_CONTACT.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Button
              variant="luxury"
              size="luxuryMd"
              onClick={() => navigate("/contact")}
            >
              <span>Contact Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="luxuryOutline"
              size="luxuryMd"
              onClick={onOpenBooking}
            >
              <span>Book a Stay</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:col-span-6 lg:justify-end">
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
