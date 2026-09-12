import {
  Building,
  ExternalLink,
  Factory,
  Flashlight,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Train,
  Waves,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const contactDetails = [
  {
    label: "Direct Desk",
    value: "+91 98765 43210",
    description: "24/7 Front Office",
  },
  {
    label: "Concierge Line",
    value: "+91 522 228900",
    description: "Transfers & Curations",
  },
];

const landmarks = [
  {
    icon: Building,
    label: "British Residency",
    distance: "2.8 km",
    className: "left-6 top-8",
  },
  {
    icon: Waves,
    label: "Gomti Riverfront",
    distance: "1.9 km",
    className: "right-6 top-14",
  },
  {
    icon: Factory,
    label: "Rumi Darwaza",
    distance: "4.1 km",
    className: "bottom-6 left-8",
  },
];

export function LocationSection() {
  return (
    <section id="location" className="w-full bg-card p-6 py-10 sm:p-8 md:p-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Find Your Sanctuary
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Location & Contact
        </h2>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Set in the heart of Hazratganj, nestled within private lush heritage
          gardens. Easily accessible from airport and transit gateways.
        </p>
      </div>

      <div
        id="contact"
        className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12"
      >
        {/* Contact Information */}
        <Card className="flex flex-col justify-between gap-6 border-border bg-card shadow-sm lg:col-span-6">
          <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5.5" />
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Estate Address
                </span>

                <span className="text-base font-semibold text-foreground">
                  Nivara Grand Palace
                </span>

                <span className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  14, Mahatma Gandhi Marg, Hazratganj, Lucknow, Uttar Pradesh
                  226001
                </span>
              </div>
            </div>

            {/* Phone Details */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              {contactDetails.map((contact) => (
                <Card
                  key={contact.label}
                  className="border-border/60 bg-muted/40 shadow-none"
                >
                  <CardContent className="flex flex-col gap-1 p-4">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {contact.label}
                    </span>

                    <span className="text-base font-medium text-foreground">
                      {contact.value}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {contact.description}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a
                href="mailto:reservations@nivara.com"
                className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4.5 text-primary" />
                <span className="font-medium">reservations@nivara.com</span>
              </a>

              <a
                href="mailto:concierge@nivara.com"
                className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4.5 text-primary" />
                <span className="font-medium">concierge@nivara.com</span>
              </a>
            </div>

            <Separator />

            {/* Transit */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-wider text-foreground uppercase">
                Transit & Accessibility
              </span>

              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Flashlight className="size-5 shrink-0 text-primary" />

                  <span>
                    <strong className="font-semibold text-foreground">
                      CCS Airport:
                    </strong>{" "}
                    14 km · 28 mins
                  </span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Train className="size-5 shrink-0 text-primary" />

                  <span>
                    <strong className="font-semibold text-foreground">
                      Charbagh Station:
                    </strong>{" "}
                    4.5 km · 15 mins
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 border-t border-border px-6 py-6 sm:px-8">
            <Link to="#" rel="noreferrer">
              <Button>
                <Navigation className="size-4.5" />
                Get Directions
                <ExternalLink className="size-3.5 opacity-60" />
              </Button>
            </Link>

            <Link to="#mailto:concierge@nivara.com">
              <Button variant="secondary">
                <MessageCircle className="size-4.5" />
                Inquire / Message Concierge
              </Button>
            </Link>
          </div>
        </Card>

        {/* Location Visualization */}
        <Card className="relative min-h-95 overflow-hidden border-border bg-muted/40 shadow-sm lg:col-span-6">
          <CardContent className="relative flex h-full flex-col justify-between gap-6 p-6">
            {/* Location Status */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card/90 px-4 py-2 shadow-sm backdrop-blur-md">
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-primary" />

                <span className="truncate text-xs font-semibold tracking-wider text-foreground uppercase">
                  Hazratganj Heritage Precinct
                </span>
              </div>

              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                26.8467° N, 80.9462° E
              </span>
            </div>

            {/* Stylized Map */}
            <div className="relative flex min-h-55 flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-background p-4">
              {/* Decorative map grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[32px_32px] opacity-40"
              />

              {/* Decorative primary area */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-3xl"
              />

              {/* Landmarks */}
              {landmarks.map((landmark) => {
                const Icon = landmark.icon;

                return (
                  <Badge
                    key={landmark.label}
                    variant="secondary"
                    className={`absolute ${landmark.className} z-10 gap-1.5 border border-border/60 bg-card/90 text-xs text-muted-foreground shadow-sm backdrop-blur-sm`}
                  >
                    <Icon className="size-3.5 text-primary" />
                    {landmark.label} ({landmark.distance})
                  </Badge>
                );
              })}

              {/* Hotel Marker */}
              <div className="relative z-20 flex flex-col items-center">
                <Badge className="gap-1.5 rounded-lg px-3 py-1.5 shadow-lg">
                  <MapPin className="size-4" />
                  Nivara Grand Palace
                </Badge>

                <div className="-mt-1.5 size-3 rotate-45 bg-primary shadow-md" />

                <div
                  aria-hidden="true"
                  className="mt-1 h-2 w-6 rounded-full bg-foreground/20 blur-[2px]"
                />
              </div>
            </div>

            {/* Map Footer */}
            <div className="flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                Valet Drop-off at Gate 1
              </span>

              <span className="font-medium text-primary">
                Complimentary Chauffeur Available
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
