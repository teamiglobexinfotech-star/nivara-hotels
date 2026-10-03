import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Mail,
  Minus,
  MoonStar,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bookingSteps } from "@/features/bookings/booking.constants";
import { dummyCustomerList } from "@/features/customers/customer.mock";

type PaymentMethod = "Cash" | "Card" | "UPI" | "Bank Transfer";
type PaymentStatus = "Paid" | "Partial" | "Pay Later";

type RoomOption = {
  id: string;
  number: string;
  type: string;
  floor: number;
  price: number;
  capacity: number;
  bed: string;
  status: "Available" | "Occupied";
  image: string;
  amenities: string[];
};

type GuestDraft = {
  fullName: string;
  age: string;
  gender: string;
  nationality: string;
  phone: string;
  email: string;
  totalGuests: string;
  specialRequest: string;
  governmentId: string;
  address: string;
  passport: string;
};

const roomCatalog: RoomOption[] = [
  {
    id: "deluxe-101",
    number: "101",
    type: "Deluxe King",
    floor: 1,
    price: 6200,
    capacity: 2,
    bed: "King bed",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    amenities: ["Ocean view", "Wi‑Fi", "Breakfast"],
  },
  {
    id: "suite-204",
    number: "204",
    type: "Executive Suite",
    floor: 2,
    price: 9300,
    capacity: 3,
    bed: "King + Sofa",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    amenities: ["Lounge", "Wi‑Fi", "Workspace"],
  },
  {
    id: "studio-318",
    number: "318",
    type: "Garden Studio",
    floor: 3,
    price: 7700,
    capacity: 2,
    bed: "Queen bed",
    status: "Occupied",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    amenities: ["Balcony", "Bath tub", "Wi‑Fi"],
  },
  {
    id: "family-412",
    number: "412",
    type: "Family Corner",
    floor: 4,
    price: 8600,
    capacity: 4,
    bed: "2 twin beds",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    amenities: ["Family pack", "City view", "Mini bar"],
  },
];

const defaultGuestDraft: GuestDraft = {
  fullName: "Aarav Mehta",
  age: "31",
  gender: "Male",
  nationality: "Indian",
  phone: "+91 98765 43210",
  email: "aarav.mehta@example.com",
  totalGuests: "2",
  specialRequest: "Late arrival after 8:00 PM; quiet room preferred.",
  governmentId: "AADHAAR 5678 9012 3456",
  address: "14 Rosewood Residency, Bengaluru",
  passport: "P4549281",
};

const paymentOptions: PaymentMethod[] = [
  "Cash",
  "Card",
  "UPI",
  "Bank Transfer",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "G"
  );
}

export function NewBookingPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    "customer-001"
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    "deluxe-101"
  );
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [roomFilters, setRoomFilters] = useState({
    checkIn: "2026-09-30",
    checkOut: "2026-10-02",
    adults: "2",
    children: "1",
    roomType: "Deluxe King",
  });
  const [guestDraft, setGuestDraft] = useState<GuestDraft>(defaultGuestDraft);
  const [optionalDetailsOpen, setOptionalDetailsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("Paid");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const filteredCustomers = useMemo(() => {
    const query = customerSearch.trim().toLowerCase();
    if (!query) return dummyCustomerList;
    return dummyCustomerList.filter((customer) => {
      const haystack = [customer.fullName, customer.email, customer.phone]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [customerSearch]);

  const selectedCustomer = useMemo(
    () =>
      dummyCustomerList.find(
        (customer) => customer.id === selectedCustomerId
      ) ?? null,
    [selectedCustomerId]
  );

  const selectedRoom = useMemo(
    () => roomCatalog.find((room) => room.id === selectedRoomId) ?? null,
    [selectedRoomId]
  );

  const nights = calculateNights(roomFilters.checkIn, roomFilters.checkOut);
  const roomSubtotal = selectedRoom ? selectedRoom.price * nights : 0;
  const taxes = Math.round(roomSubtotal * 0.12);
  const discount = roomSubtotal > 0 ? 1200 : 0;
  const grandTotal = roomSubtotal + taxes - discount;

  const canAdvance = () => {
    switch (activeStep) {
      case 1:
        return Boolean(selectedCustomer);
      case 2:
        return Boolean(selectedRoom);
      case 3:
        return (
          Boolean(guestDraft.fullName.trim()) &&
          Number(guestDraft.totalGuests) > 0
        );
      case 4:
        return Boolean(paymentMethod);
      default:
        return true;
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(1, prev - 1));
  };

  const handleContinue = () => {
    if (!canAdvance()) return;
    if (activeStep === bookingSteps.length) {
      setIsConfirmed(true);
      return;
    }
    setActiveStep((prev) => Math.min(bookingSteps.length, prev + 1));
  };

  const handleAddCustomer = () => {
    if (!newCustomer.fullName.trim() || !newCustomer.email.trim()) return;

    const customer = {
      id: `customer-${Date.now()}`,
      fullName: newCustomer.fullName.trim(),
      email: newCustomer.email.trim(),
      phone: newCustomer.phone.trim() || "+91 90000 00000",
    };

    dummyCustomerList.unshift(customer);
    setSelectedCustomerId(customer.id);
    setCustomerSearch("");
    setNewCustomer({ fullName: "", email: "", phone: "" });
    setCustomerDialogOpen(false);
  };

  const bookingTitle =
    activeStep === bookingSteps.length
      ? "Review booking"
      : bookingSteps[activeStep - 1]?.title;

  const summaryRows = [
    {
      label: "Customer",
      value: selectedCustomer?.fullName ?? "No customer",
    },
    {
      label: "Room",
      value: selectedRoom
        ? `${selectedRoom.type} • Room ${selectedRoom.number}`
        : "No room selected",
    },
    {
      label: "Dates",
      value: `${roomFilters.checkIn} → ${roomFilters.checkOut}`,
    },
    {
      label: "Nights",
      value: `${nights} night${nights > 1 ? "s" : ""}`,
    },
    {
      label: "Guests",
      value: `${guestDraft.totalGuests || 1} guest${Number(guestDraft.totalGuests) > 1 ? "s" : ""}`,
    },
    {
      label: "Payment",
      value: paymentStatus,
    },
    {
      label: "Running total",
      value: formatCurrency(grandTotal),
    },
  ];

  const stepContent = (() => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={customerSearch}
                onChange={(event) => setCustomerSearch(event.target.value)}
                placeholder="Search by name, email or phone"
                className="h-10 pl-9"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                Existing customers
              </p>
              <Dialog
                open={customerDialogOpen}
                onOpenChange={setCustomerDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="h-3.5 w-3.5" />
                    Create New Customer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create customer</DialogTitle>
                    <DialogDescription>
                      Add a new guest profile before checking in.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="customer-name">Full name</Label>
                      <Input
                        id="customer-name"
                        value={newCustomer.fullName}
                        onChange={(event) =>
                          setNewCustomer((current) => ({
                            ...current,
                            fullName: event.target.value,
                          }))
                        }
                        placeholder="Aisha Patel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer-email">Email</Label>
                      <Input
                        id="customer-email"
                        type="email"
                        value={newCustomer.email}
                        onChange={(event) =>
                          setNewCustomer((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        placeholder="aisha.patel@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer-phone">Phone</Label>
                      <Input
                        id="customer-phone"
                        value={newCustomer.phone}
                        onChange={(event) =>
                          setNewCustomer((current) => ({
                            ...current,
                            phone: event.target.value,
                          }))
                        }
                        placeholder="+91 90000 00000"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCustomerDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleAddCustomer}>
                      Save customer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {filteredCustomers.length === 0 ? (
                <Card className="border-dashed border-border bg-card p-6 text-center">
                  <p className="text-sm font-medium text-foreground">
                    No customers found
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a different search or create a new profile.
                  </p>
                </Card>
              ) : (
                filteredCustomers.map((customer) => {
                  const isSelected = selectedCustomerId === customer.id;
                  return (
                    <Card
                      key={customer.id}
                      className={`transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <CardContent className="flex items-start gap-3 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                          {getInitials(customer.fullName)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">
                                {customer.fullName}
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {customer.email}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {customer.phone}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="rounded-full px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase"
                              >
                                Returning
                              </Badge>
                              {isSelected && (
                                <Badge className="rounded-full bg-primary px-2 py-0.5 text-[10px] tracking-[0.08em] text-primary-foreground uppercase">
                                  Selected
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="text-xs text-muted-foreground">
                              Last stay: 2 weeks ago
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant={isSelected ? "default" : "outline"}
                              className="h-8 rounded-full"
                              onClick={() => setSelectedCustomerId(customer.id)}
                            >
                              {isSelected ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-6">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="checkin">Check-in date</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={roomFilters.checkIn}
                  onChange={(event) =>
                    setRoomFilters((current) => ({
                      ...current,
                      checkIn: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="checkout">Check-out date</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={roomFilters.checkOut}
                  onChange={(event) =>
                    setRoomFilters((current) => ({
                      ...current,
                      checkOut: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Adults</Label>
                <Select
                  value={roomFilters.adults}
                  onValueChange={(value) =>
                    setRoomFilters((current) => ({ ...current, adults: value }))
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Adults" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Children</Label>
                <Select
                  value={roomFilters.children}
                  onValueChange={(value) =>
                    setRoomFilters((current) => ({
                      ...current,
                      children: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Children" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3].map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label>Room type</Label>
                <Select
                  value={roomFilters.roomType}
                  onValueChange={(value) =>
                    setRoomFilters((current) => ({
                      ...current,
                      roomType: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Deluxe King",
                      "Executive Suite",
                      "Garden Studio",
                      "Family Corner",
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button type="button" className="w-full">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                Available rooms
              </p>
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-1 text-[10px] tracking-[0.08em] uppercase"
              >
                {roomCatalog.length} options
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {roomCatalog.map((room) => {
                const isSelected = selectedRoomId === room.id;
                const isAvailable = room.status === "Available";

                return (
                  <Card
                    key={room.id}
                    className={`overflow-hidden transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <img
                      src={room.image}
                      alt={room.type}
                      className="h-32 w-full object-cover"
                    />
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                            Room {room.number}
                          </p>
                          <h3 className="mt-1 text-base font-semibold text-foreground">
                            {room.type}
                          </h3>
                        </div>
                        <Badge
                          variant={isAvailable ? "secondary" : "outline"}
                          className={`rounded-full px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase ${
                            isAvailable
                              ? "bg-secondary text-foreground"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {room.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>Floor {room.floor}</span>
                        <span>•</span>
                        <span>{room.capacity} guests</span>
                        <span>•</span>
                        <span>{room.bed}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity) => (
                          <Badge
                            key={amenity}
                            variant="secondary"
                            className="rounded-full px-2 py-0.5 text-[10px]"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <div>
                          <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                            Rate
                          </p>
                          <p className="text-xl font-semibold text-foreground">
                            {formatCurrency(room.price)}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className="h-9 rounded-full"
                          onClick={() => setSelectedRoomId(room.id)}
                          disabled={!isAvailable}
                        >
                          {isSelected
                            ? "Selected"
                            : isAvailable
                              ? "Select"
                              : "Occupied"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Primary guest
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Full name</Label>
                  <Input
                    id="guest-name"
                    value={guestDraft.fullName}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-age">Age</Label>
                  <Input
                    id="guest-age"
                    type="number"
                    min={1}
                    value={guestDraft.age}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        age: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={guestDraft.gender}
                    onValueChange={(value) =>
                      setGuestDraft((current) => ({
                        ...current,
                        gender: value,
                      }))
                    }
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Male",
                        "Female",
                        "Non-binary",
                        "Prefer not to say",
                      ].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-nationality">Nationality</Label>
                  <Input
                    id="guest-nationality"
                    value={guestDraft.nationality}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        nationality: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-phone">Phone</Label>
                  <Input
                    id="guest-phone"
                    value={guestDraft.phone}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-email">Email</Label>
                  <Input
                    id="guest-email"
                    type="email"
                    value={guestDraft.email}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Stay details
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="total-guests">Total guests</Label>
                  <Input
                    id="total-guests"
                    type="number"
                    min={1}
                    value={guestDraft.totalGuests}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        totalGuests: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="special-request">Special requests</Label>
                  <Textarea
                    id="special-request"
                    value={guestDraft.specialRequest}
                    onChange={(event) =>
                      setGuestDraft((current) => ({
                        ...current,
                        specialRequest: event.target.value,
                      }))
                    }
                    className="min-h-22.5"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOptionalDetailsOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Optional details
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID, address, passport
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {optionalDetailsOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>

              {optionalDetailsOpen && (
                <div className="grid gap-4 border-t border-border p-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="government-id">Government ID</Label>
                    <Input
                      id="government-id"
                      value={guestDraft.governmentId}
                      onChange={(event) =>
                        setGuestDraft((current) => ({
                          ...current,
                          governmentId: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passport">Passport</Label>
                    <Input
                      id="passport"
                      value={guestDraft.passport}
                      onChange={(event) =>
                        setGuestDraft((current) => ({
                          ...current,
                          passport: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={guestDraft.address}
                      onChange={(event) =>
                        setGuestDraft((current) => ({
                          ...current,
                          address: event.target.value,
                        }))
                      }
                      className="min-h-20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Payment method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentOptions.map((option) => {
                  const isSelected = paymentMethod === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPaymentMethod(option)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground">
                          {option === "Cash" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : option === "Card" ? (
                            <CreditCard className="h-4 w-4" />
                          ) : option === "UPI" ? (
                            <Sparkles className="h-4 w-4" />
                          ) : (
                            <ShieldCheck className="h-4 w-4" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">
                          {option}
                        </span>
                      </div>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Pricing summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Room subtotal</span>
                    <span>{formatCurrency(roomSubtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Taxes</span>
                    <span>{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span>- {formatCurrency(discount)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-medium text-foreground">
                    Grand total
                  </span>
                  <span className="text-2xl font-semibold text-foreground">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="xl:col-span-2">
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Payment status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="inline-flex rounded-lg border border-border bg-muted p-1">
                    {(["Paid", "Partial", "Pay Later"] as PaymentStatus[]).map(
                      (status) => {
                        const isActive = paymentStatus === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setPaymentStatus(status)}
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {status}
                          </button>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  label: "Customer",
                  icon: UserRound,
                  value: selectedCustomer?.fullName ?? "Not selected",
                },
                {
                  label: "Stay",
                  icon: CalendarDays,
                  value: `${roomFilters.checkIn} • ${nights} night${nights > 1 ? "s" : ""}`,
                },
                {
                  label: "Room",
                  icon: MoonStar,
                  value: selectedRoom
                    ? `${selectedRoom.type} • Room ${selectedRoom.number}`
                    : "No room selected",
                },
                {
                  label: "Guests",
                  icon: Users,
                  value: `${guestDraft.totalGuests || 1} guest${Number(guestDraft.totalGuests) > 1 ? "s" : ""}`,
                },
                {
                  label: "Payment",
                  icon: CreditCard,
                  value: `${paymentMethod} • ${paymentStatus}`,
                },
                {
                  label: "Pricing",
                  icon: ShieldCheck,
                  value: formatCurrency(grandTotal),
                },
              ].map(({ label, icon: Icon, value }) => (
                <Card key={label} className="border-border bg-card">
                  <CardContent className="flex items-start justify-between gap-3 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {value}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs text-primary"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Edit
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/40 bg-primary/5">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      Booking ID
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      NVR-2048
                    </p>
                  </div>
                  <Badge className="rounded-full bg-primary px-2 py-1 text-[10px] tracking-[0.08em] text-primary-foreground uppercase">
                    Confirmed
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">
                    Total due
                  </span>
                  <span className="text-xl font-semibold text-foreground">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>

                <label className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
                  />
                  <span>
                    I acknowledge the reservation details, room rate, and
                    cancellation policy for this booking.
                  </span>
                </label>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  })();

  if (isConfirmed) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-2xl border-border bg-card text-center">
          <CardContent className="space-y-6 p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Booking confirmed
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Reservation created successfully
              </h2>
            </div>

            <div className="grid gap-3 text-left sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-3">
                <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Booking ID
                </p>
                <p className="mt-1 font-medium text-foreground">NVR-2048</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Guest
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {guestDraft.fullName}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Room
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {selectedRoom
                    ? `${selectedRoom.type} • Room ${selectedRoom.number}`
                    : ""}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Stay
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {roomFilters.checkIn} to {roomFilters.checkOut}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-3 sm:col-span-2">
                <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Total
                </p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {formatCurrency(grandTotal)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button type="button" variant="outline">
                Print Invoice
              </Button>
              <Button type="button" variant="outline">
                Email Receipt
              </Button>
              <Button type="button" variant="outline">
                WhatsApp Receipt
              </Button>
              <Button type="button">New Booking</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-360 px-4 py-4 lg:px-6">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              New Booking
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a reservation for a walk-in or existing customer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm">
              Save Draft
            </Button>
            <Button type="button" variant="ghost" size="sm">
              Cancel
            </Button>
          </div>
        </header>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.8fr)]">
          <div className="space-y-4">
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max items-center gap-3">
                {bookingSteps.map((step, index) => {
                  const stepNumber = index + 1;
                  const active = activeStep === stepNumber;
                  const complete = activeStep > stepNumber;

                  return (
                    <div key={step.title} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveStep(stepNumber)}
                        className={`flex items-center gap-3 rounded-full border px-2.5 py-2 text-left transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-foreground"
                            : complete
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card text-muted-foreground"
                        }`}
                        disabled={stepNumber > activeStep + 1}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium ${active ? "bg-primary text-primary-foreground" : complete ? "bg-primary-foreground text-primary" : "bg-muted text-foreground"}`}
                        >
                          {complete ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            stepNumber
                          )}
                        </span>
                        <span className="text-sm font-medium">
                          {step.title}
                        </span>
                      </button>

                      {stepNumber < bookingSteps.length && (
                        <span
                          className="h-px w-8 bg-border"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                      Step {activeStep}
                    </p>
                    <CardTitle className="mt-1 text-xl font-semibold text-foreground">
                      {bookingTitle}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-1 text-[10px] tracking-[0.08em] uppercase"
                  >
                    {activeStep}/5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>{stepContent}</CardContent>
            </Card>
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                      Booking summary
                    </p>
                    <CardTitle className="mt-1 text-lg font-semibold text-foreground">
                      Reservation
                    </CardTitle>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0">
                {summaryRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-right text-sm font-medium text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}

                <div className="mt-3 rounded-xl border border-border bg-background p-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Current total</span>
                    <span className="text-xl font-semibold text-foreground">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="sticky bottom-0 z-20 mt-5 border-t border-border bg-background">
          <div className="mx-auto flex max-w-360 items-center justify-between gap-3 py-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={activeStep === 1}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back
            </Button>

            <Button
              type="button"
              onClick={handleContinue}
              disabled={!canAdvance() || (activeStep === 5 && !termsAccepted)}
            >
              {activeStep === bookingSteps.length
                ? "Confirm Booking"
                : "Continue"}
              {activeStep !== 5 && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
