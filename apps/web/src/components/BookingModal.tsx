import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ROOMS_DATA } from "../data";
import type { Room } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: Room;
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoom,
  initialRoomId = "heritage-suite",
  initialCheckIn = "2026-10-14",
  initialCheckOut = "2026-10-18",
  initialGuests = 2,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState(
    initialRoom?.id || initialRoomId
  );
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adults, setAdults] = useState(initialGuests);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  useEffect(() => {
    if (initialRoom) {
      setSelectedRoomId(initialRoom.id);
    } else if (initialRoomId) {
      setSelectedRoomId(initialRoomId);
    }
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setAdults(initialGuests);
  }, [
    initialRoom,
    initialRoomId,
    initialCheckIn,
    initialCheckOut,
    initialGuests,
  ]);

  const currentRoom =
    ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[1];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 4;
  const totalPrice = currentRoom.price * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `NVRA-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(randomCode);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto p-6 sm:p-8">
        {isSuccess ? (
          <div className="space-y-6 px-2 py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Reservation Confirmed
              </span>
              <DialogTitle className="font-serif text-3xl text-foreground">
                We look forward to welcoming you.
              </DialogTitle>
              <DialogDescription className="mx-auto max-w-md text-sm text-muted-foreground">
                Your reservation dossier{" "}
                <span className="font-mono font-medium text-primary">
                  #{bookingCode}
                </span>{" "}
                has been transmitted to our Chief Concierge. A personalized
                itinerary will be dispatched to {email || "your email"}.
              </DialogDescription>
            </div>

            <div className="space-y-2 rounded-2xl border border-border bg-card p-5 text-left text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Sanctuary:</span>
                <span className="font-serif font-medium text-foreground">
                  {currentRoom.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Arrival:</span>
                <span className="text-foreground">{checkIn} (15:00 hrs)</span>
              </div>
              <div className="flex justify-between">
                <span>Departure:</span>
                <span className="text-foreground">{checkOut} (12:00 hrs)</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-medium text-primary">
                <span>Total Sovereign Rate ({nights} nights):</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Button
              variant="luxury"
              size="luxuryLg"
              onClick={handleReset}
              className="w-full"
            >
              Return to Sanctuary
            </Button>
          </div>
        ) : (
          <div>
            <DialogHeader className="mb-6 space-y-1 text-left">
              <span className="text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
                Private Reservations
              </span>
              <DialogTitle className="font-serif text-2xl text-foreground sm:text-3xl">
                Reserve Your Stay at Nivara
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Best rates guaranteed directly with our private concierge team.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Room Selection */}
              <div>
                <Label className="mb-2 block text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  Select Sanctuary Accommodation
                </Label>
                <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                  {ROOMS_DATA.map((room) => (
                    <Button
                      type="button"
                      variant="ghost"
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`flex h-auto items-center justify-between rounded-xl border p-3 text-left whitespace-normal transition-all ${
                        selectedRoomId === room.id
                          ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                          : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:bg-card"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-serif text-xs font-medium text-foreground">
                          {room.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {room.sizeM2} m² · {room.view}
                        </p>
                      </div>
                      <span className="ml-2 shrink-0 text-xs font-semibold text-primary">
                        {room.priceFormatted}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Check-in Date
                  </Label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="bg-card text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Check-out Date
                  </Label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="bg-card text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Total Guests
                  </Label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="flex h-9 w-full cursor-pointer rounded-md border border-input bg-card px-3 py-1 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <option value={1} className="bg-card text-card-foreground">
                      1 Guest (Solitary)
                    </option>
                    <option value={2} className="bg-card text-card-foreground">
                      2 Guests (Standard)
                    </option>
                    <option value={3} className="bg-card text-card-foreground">
                      3 Guests
                    </option>
                    <option value={4} className="bg-card text-card-foreground">
                      4 Guests (Pavilion)
                    </option>
                    <option value={6} className="bg-card text-card-foreground">
                      6 Guests (Residence)
                    </option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Full Name *
                  </Label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    required
                    placeholder="patron@sanctuary.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-card text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  Telephone / WhatsApp (for Airport Chauffeur)
                </Label>
                <Input
                  type="tel"
                  placeholder="+91 (141) 289 4400"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-card text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  Particulars & Dietary / Wellness Requests
                </Label>
                <Textarea
                  rows={2}
                  placeholder="Tell us about special occasions, dietary preferences, pillow choice, or airport arrival coordinates..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="bg-card text-xs"
                />
              </div>

              {/* Price summary & CTA */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-3 sm:flex-row">
                <div className="w-full text-left sm:w-auto">
                  <p className="text-[11px] text-muted-foreground">
                    Total for {nights} night{nights > 1 ? "s" : ""} (Includes
                    Taxes & Valet):
                  </p>
                  <p className="font-serif text-lg font-medium text-primary">
                    ₹{totalPrice.toLocaleString("en-IN")}{" "}
                    <span className="font-sans text-[11px] font-normal text-muted-foreground">
                      (from {currentRoom.priceFormatted} / night)
                    </span>
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="luxury"
                  size="luxuryLg"
                  className="w-full sm:w-auto"
                >
                  Confirm Reservation →
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
