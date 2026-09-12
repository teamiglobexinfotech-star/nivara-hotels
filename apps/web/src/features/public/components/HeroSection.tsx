import type { ReactNode } from "react";
import { CalendarDays, Compass, Search, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HERO_IMAGE from "@/assets/hero_section.png";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative mb-12 w-full overflow-hidden rounded-2xl bg-primary shadow-md"
    >
      <div className="relative flex min-h-145 w-full flex-col justify-between p-6 text-primary-foreground sm:p-8 lg:p-12">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Nivara Hotels Royal Suite Courtyard View"
            className="h-full w-full object-cover object-center brightness-[0.78]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-primary/30 to-primary/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex max-w-2xl flex-col gap-4 pt-4">
          {/* Badge */}
          <div className="flex items-center gap-2 self-start rounded-full bg-secondary px-3 py-1 text-secondary-foreground shadow-sm backdrop-blur-md">
            <Sparkles className="size-3.5" />

            <span className="text-xs font-semibold tracking-wider uppercase">
              Awadhi Heritage &amp; Modern Luxury
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Where Every Stay Feels Like Coming Home
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            Thoughtfully designed rooms, effortless comfort, and hospitality
            that remembers your name. Discover an intimate sanctuary where
            timeless Indian elegance meets thoughtful, modern service.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 rounded-xl px-8 shadow-md"
            >
              <a href="#rooms">
                Browse Rooms
                <Compass className="size-4.5" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <a href="#about">Our Heritage Story</a>
            </Button>
          </div>
        </div>

        {/* Availability */}
        <Card className="relative z-10 mt-8 grid w-full grid-cols-1 items-center gap-3 rounded-xl border-border/50 bg-card p-4 text-card-foreground shadow-xl sm:grid-cols-2 md:grid-cols-4">
          <AvailabilityItem
            label="Check-in"
            value="Thu, 12 Oct"
            icon={<CalendarDays className="size-4.5" />}
          />

          <AvailabilityItem
            label="Check-out"
            value="Sun, 15 Oct"
            icon={<CalendarDays className="size-4.5" />}
          />

          <AvailabilityItem
            label="Guests & Rooms"
            value="2 Adults, 1 Room"
            icon={<Users className="size-4.5" />}
          />

          <Button
            type="button"
            size="lg"
            className="h-full min-h-13 w-full gap-2 rounded-lg font-semibold shadow-sm"
          >
            <Search className="size-5" />
            Check Availability
          </Button>
        </Card>
      </div>
    </section>
  );
}

interface AvailabilityItemProps {
  label: string;
  value: string;
  icon: ReactNode;
}

function AvailabilityItem({ label, value, icon }: AvailabilityItemProps) {
  return (
    <button
      type="button"
      className="flex min-h-13 flex-col rounded-lg bg-muted px-4 py-2 text-left transition-colors hover:bg-muted/80"
    >
      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </span>

      <span className="mt-0.5 flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-primary">{icon}</span>
        {value}
      </span>
    </button>
  );
}
