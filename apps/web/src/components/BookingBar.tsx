import React, { useState, useRef } from 'react';
import { Calendar, Users, BedDouble, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BookingSearchDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  selection: string;
  roomId?: string;
}

interface BookingBarProps {
  onSearch: (details: BookingSearchDetails) => void;
  className?: string;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onSearch, className = '' }) => {
  const [checkIn, setCheckIn] = useState('2026-10-14');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guests, setGuests] = useState('2 Adults, 0 Children');
  const [selection, setSelection] = useState('01 Suites & Villas');

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const guestCount = guests.includes('1')
      ? 1
      : guests.includes('4')
      ? 4
      : guests.includes('6')
      ? 6
      : 2;
    const roomId = selection.includes('01')
      ? 'heritage-suite'
      : selection.includes('02')
      ? 'courtyard-room'
      : selection.includes('03')
      ? 'private-residence'
      : undefined;

    onSearch({
      checkIn,
      checkOut,
      guests: guestCount,
      selection,
      roomId,
    });
  };

  const triggerPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      try {
        ref.current.showPicker?.();
      } catch {
        ref.current.focus();
      }
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <form
        onSubmit={handleAction}
        className="w-full bg-card/90 backdrop-blur-xl border border-border/80 rounded-2xl lg:rounded-full p-3 sm:p-4 lg:py-2 lg:pr-2 lg:pl-6 shadow-2xl shadow-background/50 transition-all"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
          {/* 4 Interactive Fields */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-1 lg:items-center gap-2 sm:gap-3 lg:gap-0">
            {/* Check-In */}
            <div
              onClick={() => triggerPicker(checkInRef)}
              className="col-span-1 flex-1 min-w-0 p-2.5 sm:p-3 lg:p-0 lg:px-4 lg:py-1.5 rounded-xl lg:rounded-none bg-background/50 lg:bg-transparent border border-border/60 lg:border-0 lg:border-r lg:border-border/60 flex flex-col justify-center cursor-pointer group"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1.5 mb-1 whitespace-nowrap group-hover:text-primary transition-colors">
                <Calendar className="w-3 h-3 text-primary shrink-0" />
                <span>CHECK-IN</span>
              </span>
              <input
                ref={checkInRef}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-xs xl:text-sm font-serif font-medium text-foreground focus:outline-none cursor-pointer [color-scheme:dark] truncate"
              />
            </div>

            {/* Check-Out */}
            <div
              onClick={() => triggerPicker(checkOutRef)}
              className="col-span-1 flex-1 min-w-0 p-2.5 sm:p-3 lg:p-0 lg:px-4 lg:py-1.5 rounded-xl lg:rounded-none bg-background/50 lg:bg-transparent border border-border/60 lg:border-0 lg:border-r lg:border-border/60 flex flex-col justify-center cursor-pointer group"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1.5 mb-1 whitespace-nowrap group-hover:text-primary transition-colors">
                <Calendar className="w-3 h-3 text-primary shrink-0" />
                <span>CHECK-OUT</span>
              </span>
              <input
                ref={checkOutRef}
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-xs xl:text-sm font-serif font-medium text-foreground focus:outline-none cursor-pointer [color-scheme:dark] truncate"
              />
            </div>

            {/* Guests */}
            <div className="col-span-2 sm:col-span-1 flex-1 min-w-0 p-2.5 sm:p-3 lg:p-0 lg:px-4 lg:py-1.5 rounded-xl lg:rounded-none bg-background/50 lg:bg-transparent border border-border/60 lg:border-0 lg:border-r lg:border-border/60 flex flex-col justify-center">
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1.5 mb-1 whitespace-nowrap">
                <Users className="w-3 h-3 text-primary shrink-0" />
                <span>GUESTS</span>
              </span>
              <div className="relative flex items-center">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-xs xl:text-sm font-serif font-medium text-foreground focus:outline-none cursor-pointer appearance-none pr-5 truncate"
                >
                  <option value="1 Adult, 0 Children" className="bg-card text-card-foreground">1 Adult, 0 Children</option>
                  <option value="2 Adults, 0 Children" className="bg-card text-card-foreground">2 Adults, 0 Children</option>
                  <option value="2 Adults, 1 Child" className="bg-card text-card-foreground">2 Adults, 1 Child</option>
                  <option value="4 Adults, 2 Children" className="bg-card text-card-foreground">4 Adults (Pavilion)</option>
                  <option value="6 Guests (Residence)" className="bg-card text-card-foreground">6 Guests (Residence)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground pointer-events-none absolute right-0 shrink-0" />
              </div>
            </div>

            {/* Selection */}
            <div className="col-span-2 sm:col-span-1 flex-1 min-w-0 p-2.5 sm:p-3 lg:p-0 lg:px-4 lg:py-1.5 rounded-xl lg:rounded-none bg-background/50 lg:bg-transparent border border-border/60 lg:border-0 flex flex-col justify-center">
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1.5 mb-1 whitespace-nowrap">
                <BedDouble className="w-3 h-3 text-primary shrink-0" />
                <span>SELECTION</span>
              </span>
              <div className="relative flex items-center">
                <select
                  value={selection}
                  onChange={(e) => setSelection(e.target.value)}
                  className="w-full bg-transparent text-xs xl:text-sm font-serif font-medium text-foreground focus:outline-none cursor-pointer appearance-none pr-5 truncate"
                >
                  <option value="01 Suites & Villas" className="bg-card text-card-foreground">01 Suites & Villas</option>
                  <option value="02 Deluxe Rooms" className="bg-card text-card-foreground">02 Deluxe Rooms</option>
                  <option value="03 Private Residences" className="bg-card text-card-foreground">03 Private Residences</option>
                  <option value="Full Sanctuary Buyout" className="bg-card text-card-foreground">Full Sanctuary Buyout</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground pointer-events-none absolute right-0 shrink-0" />
              </div>
            </div>
          </div>

          {/* Search CTA */}
          <Button
            type="submit"
            variant="luxury"
            size="luxuryMd"
            className="w-full lg:w-auto h-12 lg:h-11 px-6 xl:px-7 rounded-full shrink-0 font-semibold uppercase tracking-[0.16em] text-xs whitespace-nowrap shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-1 sm:mt-2 lg:mt-0 lg:ml-2"
          >
            <span>CHECK RATES</span>
            <Search className="w-3.5 h-3.5 shrink-0" />
          </Button>
        </div>
      </form>
    </div>
  );
};
