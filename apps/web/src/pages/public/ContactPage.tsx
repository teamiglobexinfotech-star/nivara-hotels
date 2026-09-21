import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HOTEL_CONTACT } from "@/mock/app.mock";

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Hotel Room Reservation",
    arrivalDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-28 text-foreground">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 text-center sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase sm:text-[11px]">
              Contact Nivara Hotels
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-[1.12] font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            We would love to <br />
            <span className="font-normal text-primary italic">
              hear from you.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed font-light text-muted-foreground sm:text-base md:text-lg">
            Whether you have questions regarding room availability, special
            dietary preferences, arrival schedules, or private arrangements in
            Jaipur, our reservations team is ready to assist.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & INTERACTIVE FORM */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Contact Info & Transit */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-3">
              <span className="block text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
                Direct Inquiries
              </span>
              <h2 className="font-serif text-3xl text-foreground">
                Hotel Reservations & Concierge
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base text-card-foreground">
                    Telephone
                  </h3>
                </div>
                <p className="text-xs font-light text-muted-foreground">
                  Direct reservations line and concierge desk:
                </p>
                <p className="font-serif text-lg font-medium text-primary">
                  {HOTEL_CONTACT.phone}
                </p>
                <p className="text-[10px] text-muted-foreground/70">
                  Available 24 hours, 7 days a week
                </p>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base text-card-foreground">
                    Email
                  </h3>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reservations:</span>
                    <span className="font-medium text-foreground">
                      {HOTEL_CONTACT.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Concierge Desk:
                    </span>
                    <span className="font-medium text-foreground">
                      {HOTEL_CONTACT.conciergeEmail}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base text-card-foreground">
                    Location
                  </h3>
                </div>
                <p className="text-xs leading-relaxed font-light text-muted-foreground">
                  {HOTEL_CONTACT.address}
                </p>
                <p className="text-[10px] text-primary">
                  Jaipur International Airport (JAI) · 35 minutes via private
                  transfer
                </p>
              </div>
            </div>

            {/* Arrival & Transit */}
            <div className="space-y-3 rounded-3xl border border-primary/20 bg-card p-6">
              <span className="block text-[9px] font-semibold tracking-[0.2em] text-primary uppercase">
                Arrival Options
              </span>
              <h4 className="font-serif text-lg text-card-foreground">
                Airport Chauffeur Service
              </h4>
              <p className="text-xs leading-relaxed font-light text-muted-foreground">
                Chauffeur transfers in air-conditioned luxury sedans can be
                coordinated directly with our concierge desk prior to your
                arrival at Jaipur International Airport or Jaipur Junction
                Railway Station.
              </p>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-2xl sm:p-10">
              <div className="mb-8 space-y-2">
                <span className="block text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
                  Message Us
                </span>
                <h3 className="font-serif text-2xl text-card-foreground sm:text-3xl">
                  Send a Message
                </h3>
                <p className="text-xs font-light text-muted-foreground">
                  Our reservations team will respond within 4 hours.
                </p>
              </div>

              {submitted ? (
                <div className="space-y-4 rounded-2xl border border-primary/30 bg-background px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/15 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-foreground">
                    Message Received
                  </h4>
                  <p className="mx-auto max-w-md text-xs leading-relaxed text-muted-foreground">
                    Thank you, {formData.name || "valued guest"}. Your inquiry
                    regarding{" "}
                    <span className="font-medium text-primary">
                      {formData.inquiryType}
                    </span>{" "}
                    has been received. Our concierge team is reviewing your
                    message and will reply to{" "}
                    <span className="text-primary">
                      {formData.email || "your email"}
                    </span>{" "}
                    promptly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        inquiryType: "Hotel Room Reservation",
                        arrivalDate: "",
                        message: "",
                      });
                    }}
                    className="mt-4 rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        Full Name *
                      </Label>
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Julian Vance"
                        className="h-auto bg-background py-3 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        Email Address *
                      </Label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="patron@sanctuary.com"
                        className="h-auto bg-background py-3 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="h-auto bg-background py-3 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        Inquiry Topic
                      </Label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inquiryType: e.target.value,
                          })
                        }
                        className="w-full cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <option
                          value="Hotel Room Reservation"
                          className="bg-card text-foreground"
                        >
                          Hotel Room Reservation
                        </option>
                        <option
                          value="Special Requests & Dietary"
                          className="bg-card text-foreground"
                        >
                          Special Requests & Dietary
                        </option>
                        <option
                          value="Airport Transfer Request"
                          className="bg-card text-foreground"
                        >
                          Airport Transfer Request
                        </option>
                        <option
                          value="Extended Stay / Multiple Rooms"
                          className="bg-card text-foreground"
                        >
                          Extended Stay / Multiple Rooms
                        </option>
                        <option
                          value="General Hotel Inquiries"
                          className="bg-card text-foreground"
                        >
                          General Hotel Inquiries
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      Planned Dates of Stay (Optional)
                    </Label>
                    <Input
                      type="text"
                      value={formData.arrivalDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          arrivalDate: e.target.value,
                        })
                      }
                      placeholder="e.g. October 15 - 19, 2026 (2 guests)"
                      className="h-auto bg-background py-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      Message & Special Requests *
                    </Label>
                    <Textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please let us know your room preference, arrival details, or any special arrangements needed for your stay..."
                      className="resize-none bg-background py-3 text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="luxury"
                    size="luxuryLg"
                    className="flex w-full items-center justify-center gap-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL ARCH SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative aspect-21/9 overflow-hidden rounded-3xl border border-border bg-background">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
            alt="Nivara Hotels Courtyard at twilight"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute right-6 bottom-6 left-6 flex flex-col justify-between sm:flex-row sm:items-baseline">
            <div>
              <p className="font-serif text-2xl text-foreground">
                Nivara Courtyard at Twilight
              </p>
              <p className="text-xs text-muted-foreground">
                Amber Ridge Foothills, Jaipur · Valet check-in and private
                cloister
              </p>
            </div>
            <p className="mt-2 text-[11px] font-medium tracking-widest text-primary uppercase sm:mt-0">
              We look forward to hosting you
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
