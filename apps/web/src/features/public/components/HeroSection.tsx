import { useState } from "react";
import { CalendarDays, Compass, Search, Sparkles } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import HERO_IMAGE from "@/assets/private_terrace.png";

export function HeroSection() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  return (
    <section id="home" className="relative w-full bg-primary shadow-md">
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
            <a href="#rooms">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 rounded-xl px-8 shadow-md"
              >
                Browse Rooms
                <Compass className="size-4.5" />
              </Button>
            </a>
            <Button size="lg">
              <a href="#about">Our Heritage Story</a>
            </Button>
          </div>
        </div>

        {/* Availability */}
        <Card className="relative z-10 mt-8 mr-auto w-fit rounded-2xl border border-border/60 bg-background/95 p-2 shadow-2xl shadow-black/10 backdrop-blur">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_auto] md:gap-0">
            {/* Check-in */}
            <DatePicker label="Check-in" date={checkIn} onSelect={setCheckIn} />

            {/* Check-out */}
            <DatePicker
              label="Check-out"
              date={checkOut}
              onSelect={setCheckOut}
              minDate={checkIn}
            />

            {/* Search */}
            <Button
              type="button"
              size="lg"
              className="h-14 rounded-xl px-7 font-semibold shadow-md md:ml-2"
              onClick={() => {
                console.log({
                  checkIn,
                  checkOut,
                });
              }}
            >
              <Search className="size-5" />
              Check Availability
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

interface DatePickerProps {
  label: string;
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
}

function DatePicker({ label, date, onSelect, minDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          className="group flex min-h-14 w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none md:rounded-none md:px-5"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="size-4 text-primary" />
          </div>

          <div className="min-w-0">
            <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              {label}
            </div>

            <div className="mt-0.5 truncate text-sm font-semibold text-foreground">
              {date ? (
                format(date, "EEE, dd MMM yyyy")
              ) : (
                <span className="font-medium text-muted-foreground">
                  Choose a date
                </span>
              )}
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto rounded-xl p-0 shadow-xl" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={(day) => {
            if (day < startOfToday()) {
              return true;
            }

            if (minDate && day < minDate) {
              return true;
            }

            return false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function startOfToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}
