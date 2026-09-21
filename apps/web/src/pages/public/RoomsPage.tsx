import {
  BedDouble,
  Calendar,
  Coffee,
  MessageSquare,
  Moon,
  Sparkles,
  Users,
  Utensils,
  Wind,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { INCLUDED_SERVICES, ROOMS_DATA } from "@/data";
import type { Room } from "@/types";

interface RoomsPageProps {
  onOpenBooking: (room?: Room) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] =
    useState<string>("All Collections");
  const navigate = useNavigate();

  const categories = ["All Collections", "Suites", "Residences", "Villas"];

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 text-foreground">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-12 text-center sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase sm:text-[11px]">
              Accommodations
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-[1.12] font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Spaces designed for <br />
            <span className="font-normal text-primary italic">
              beautiful stays.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed font-light text-muted-foreground sm:text-base md:text-lg">
            Thoughtfully composed rooms and expansive residences where natural
            textures, quiet daylight, and effortless comfort come together.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full text-xs font-medium tracking-[0.16em] uppercase ${
                activeCategory === cat
                  ? "border border-primary/40 bg-secondary text-secondary-foreground shadow-md shadow-primary/10 hover:bg-secondary"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* 2. EDITORIAL ASYMMETRIC ROOM COLLECTION */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Row 1: Nivara Deluxe (left) + Heritage Suite (right large featured) */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Nivara Deluxe */}
            <div className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 lg:col-span-5">
              <div className="space-y-4">
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-background">
                  <img
                    src={ROOMS_DATA[0].image}
                    alt={ROOMS_DATA[0].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="hotel">Courtyard View</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      Collection 01 — Room
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      42 m² / 452 FT²
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-card-foreground">
                    {ROOMS_DATA[0].name}
                  </h3>
                  <p className="text-xs leading-relaxed font-light text-muted-foreground">
                    {ROOMS_DATA[0].shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-primary" /> 2 Guests
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3 w-3 text-primary" /> King Bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" /> Freestanding
                    Tub
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <div>
                  <span className="block text-[10px] tracking-wider text-muted-foreground uppercase">
                    Nightly Rate
                  </span>
                  <span className="font-serif text-xl font-medium text-primary">
                    ₹18,500
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {" "}
                    / night
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenBooking(ROOMS_DATA[0])}
                  className="rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
                >
                  Reserve Room
                </Button>
              </div>
            </div>

            {/* Heritage Suite (Featured Wide with Arch Motif) */}
            <div className="group flex flex-col justify-between rounded-3xl border border-primary/30 bg-card p-6 shadow-2xl shadow-background/50 sm:p-8 lg:col-span-7">
              <div className="space-y-6">
                {/* Arch-shaped showcase image */}
                <div className="relative aspect-video overflow-hidden rounded-t-[100px] rounded-b-2xl border border-primary/20 bg-background sm:aspect-21/10 sm:rounded-t-[140px]">
                  <img
                    src={ROOMS_DATA[1].image}
                    alt={ROOMS_DATA[1].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="luxury">Curated Sanctuary</Badge>
                  </div>
                  <div className="absolute bottom-3 left-4 font-serif text-[11px] text-foreground">
                    Heirloom flora outlook & limestone hearth
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-primary uppercase">
                      Collection 02 — Curated Suite
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      68 m² / 732 FT²
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <h3 className="font-serif text-3xl text-card-foreground sm:text-4xl">
                      {ROOMS_DATA[1].name}
                    </h3>
                    <div>
                      <span className="font-serif text-2xl font-medium text-primary sm:text-3xl">
                        ₹28,000
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        / night
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
                    {ROOMS_DATA[1].shortDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground sm:grid-cols-4">
                  <div>
                    <span className="block text-[9px] tracking-wider text-muted-foreground/70 uppercase">
                      Bedding
                    </span>
                    <span className="font-medium text-foreground">
                      Master King Bed
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-wider text-muted-foreground/70 uppercase">
                      Occupancy
                    </span>
                    <span className="font-medium text-foreground">
                      2 Guests
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-wider text-muted-foreground/70 uppercase">
                      Salon
                    </span>
                    <span className="font-medium text-foreground">
                      Private Living Lounge
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-wider text-muted-foreground/70 uppercase">
                      Storage
                    </span>
                    <span className="font-medium text-foreground">
                      Walk-in Dressing
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Butler service & in-suite welcome bar included</span>
                </div>
                <Button
                  variant="luxury"
                  size="luxuryMd"
                  onClick={() => onOpenBooking(ROOMS_DATA[1])}
                >
                  Book Heritage Suite
                </Button>
              </div>
            </div>
          </div>

          {/* Row 2: Atrium Terrace Room (left) + Nivara Grand Pavilion (right) */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Atrium Terrace Room */}
            <div className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 lg:col-span-5">
              <div className="space-y-4">
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-background">
                  <img
                    src={ROOMS_DATA[2].image}
                    alt={ROOMS_DATA[2].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="hotel">Skyline & Atrium View</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      Collection 03 — Room
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      50 m² / 538 FT²
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-card-foreground">
                    {ROOMS_DATA[2].name}
                  </h3>
                  <p className="text-xs leading-relaxed font-light text-muted-foreground">
                    {ROOMS_DATA[2].shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-primary" /> 2 Guests
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3 w-3 text-primary" /> Queen Bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" /> Sunken Bathtub
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <div>
                  <span className="block text-[10px] tracking-wider text-muted-foreground uppercase">
                    Nightly Rate
                  </span>
                  <span className="font-serif text-xl font-medium text-primary">
                    ₹22,000
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {" "}
                    / night
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenBooking(ROOMS_DATA[2])}
                  className="rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
                >
                  Reserve Room
                </Button>
              </div>
            </div>

            {/* Nivara Grand Pavilion */}
            <div className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-7">
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-background sm:aspect-21/10">
                  <img
                    src={ROOMS_DATA[3].image}
                    alt={ROOMS_DATA[3].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="hotel">Forest Canopy View</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="luxury">Private Plunge Pool</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      Collection 04 — Pavilion Villa
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      85 m² / 915 FT²
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <h3 className="font-serif text-3xl text-card-foreground">
                      {ROOMS_DATA[3].name}
                    </h3>
                    <div>
                      <span className="font-serif text-2xl font-medium text-primary">
                        ₹42,000
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        / night
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
                    {ROOMS_DATA[3].shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-muted-foreground">
                  <span>● 4 Guests</span>
                  <span>● 2 King Beds</span>
                  <span>● Private Plunge Pool</span>
                  <span>● Open Fireplace</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <span className="text-xs text-muted-foreground">
                  Inclusive of daily private cabana service
                </span>
                <Button
                  variant="luxury"
                  size="luxurySm"
                  onClick={() => onOpenBooking(ROOMS_DATA[3])}
                >
                  Book Pavilion
                </Button>
              </div>
            </div>
          </div>

          {/* Row 3: Signature Residence (Dual Arch composition) + The Presidential Sanctuary */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Signature Residence (Dual Arch Image composition) */}
            <div className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-7">
              <div className="space-y-6">
                {/* Dual Arch Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-2xl border border-primary/30 bg-background">
                    <img
                      src={ROOMS_DATA[4].image}
                      alt="Signature Residence Master Bedroom"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute right-2 bottom-2 left-2 rounded bg-background/80 py-1 text-center text-[9px] tracking-[0.16em] text-primary uppercase backdrop-blur-md">
                      Master Bedroom & View
                    </div>
                  </div>
                  <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-2xl border border-primary/30 bg-background">
                    <img
                      src={ROOMS_DATA[4].secondaryImage || ROOMS_DATA[4].image}
                      alt="Signature Residence Salon"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute right-2 bottom-2 left-2 rounded bg-background/80 py-1 text-center text-[9px] tracking-[0.16em] text-primary uppercase backdrop-blur-md">
                      Private Salon & Dining
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      Collection 05 — Multi-Room Residence
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      92 m² / 990 FT²
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <h3 className="font-serif text-3xl text-card-foreground">
                      {ROOMS_DATA[4].name}
                    </h3>
                    <div>
                      <span className="font-serif text-2xl font-medium text-primary sm:text-3xl">
                        ₹56,000
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        / night
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
                    {ROOMS_DATA[4].shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-[11px] text-muted-foreground">
                  <span>● 6 Guests</span>
                  <span>● 1 Master King + Guest Queen</span>
                  <span>● Butler Pantry</span>
                  <span>● Valley Panorama</span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
                <span className="text-xs text-muted-foreground">
                  Includes complimentary daily afternoon tea & laundry service
                </span>
                <Button
                  variant="luxury"
                  size="luxurySm"
                  onClick={() => onOpenBooking(ROOMS_DATA[4])}
                >
                  Reserve Residence
                </Button>
              </div>
            </div>

            {/* The Presidential Sanctuary (Tall Apex Penthouse) */}
            <div className="group flex flex-col justify-between rounded-3xl border border-primary/40 bg-card p-6 shadow-2xl shadow-background/50 sm:p-7 lg:col-span-5">
              <div className="space-y-4">
                {/* Arch-shaped showcase image */}
                <div className="relative aspect-4/5 overflow-hidden rounded-t-[140px] rounded-b-2xl border border-primary/20 bg-background">
                  <img
                    src={ROOMS_DATA[5].image}
                    alt={ROOMS_DATA[5].name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="luxury">Penthouse Apex</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-primary uppercase">
                      Collection 06 — The Apex
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      140 m² / 1,506 FT²
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-card-foreground sm:text-3xl">
                    {ROOMS_DATA[5].name}
                  </h3>
                  <p className="text-xs leading-relaxed font-light text-muted-foreground">
                    {ROOMS_DATA[5].shortDescription}
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-border pt-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="text-foreground">
                      6 Guests (3 Bedrooms)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terrace:</span>
                    <span className="text-foreground">
                      Private Infinity Spa Pool
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concierge:</span>
                    <span className="font-medium text-primary">
                      Dedicated Majordomo
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <div>
                  <span className="block text-[10px] tracking-wider text-muted-foreground uppercase">
                    Nightly Rate
                  </span>
                  <span className="font-serif text-2xl font-medium text-primary">
                    ₹95,000
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {" "}
                    / night
                  </span>
                </div>
                <Button
                  variant="luxury"
                  size="luxurySm"
                  onClick={() => onOpenBooking(ROOMS_DATA[5])}
                >
                  Private Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "INCLUDED IN EVERY STAY" SECTION */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
              Standard of Care
            </span>
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
              Included in Every Stay
            </h2>
          </div>
          <p className="max-w-md text-xs font-light text-muted-foreground sm:text-sm md:text-right">
            Every stay at Nivara is accompanied by tactile luxuries curated for
            complete physical restoration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {INCLUDED_SERVICES.map((srv, idx) => {
            const Icon =
              srv.icon === "Utensils"
                ? Utensils
                : srv.icon === "Moon"
                  ? Moon
                  : srv.icon === "Wind"
                    ? Wind
                    : srv.icon === "Coffee"
                      ? Coffee
                      : Sparkles;

            return (
              <div
                key={idx}
                className="flex flex-col justify-between space-y-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base text-card-foreground">
                    {srv.title}
                  </h4>
                  <p className="text-xs leading-relaxed font-light text-muted-foreground">
                    {srv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "SUITE SPECIFICATIONS & OVERVIEW" COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="mb-2 block text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            At a Glance
          </span>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
            Suite Specifications & Overview
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted text-[10px] tracking-[0.18em] text-foreground uppercase">
                <TableHead className="px-5 py-4 text-foreground">
                  Accommodation
                </TableHead>
                <TableHead className="px-4 py-4 text-foreground">
                  Dimensions
                </TableHead>
                <TableHead className="px-4 py-4 text-foreground">
                  Primary View
                </TableHead>
                <TableHead className="px-4 py-4 text-foreground">
                  Private Balcony / Deck
                </TableHead>
                <TableHead className="px-4 py-4 text-foreground">
                  Pool / Water Feature
                </TableHead>
                <TableHead className="px-4 py-4 text-foreground">
                  Concierge Level
                </TableHead>
                <TableHead className="px-5 py-4 text-right text-foreground">
                  Nightly Rate
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROOMS_DATA.map((r) => (
                <TableRow
                  key={r.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  <TableCell className="px-5 py-4 font-serif text-sm font-medium text-card-foreground">
                    {r.name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {r.sizeM2} m² ({r.sizeSqFt} ft²)
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {r.view}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {r.specs.terrace || "Yes (Private Balcony)"}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {r.specs.tub || "Freestanding Stone Tub"}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {r.specs.butler || "Standard 24/7 Front Desk"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-right font-serif font-semibold text-primary">
                    {r.priceFormatted}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 5. EXTENDED STAYS / BESPOKE ITINERARY BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-card p-8 sm:p-12 md:flex-row">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
              Private Consultations
            </span>
            <h3 className="font-serif text-2xl text-card-foreground sm:text-3xl">
              Seeking tailored suite configurations or extended stays?
            </h3>
            <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
              Our guest directors assist with multi-room wing reservations,
              private-culinary itineraries, floor buyouts, and seasonal retreat
              bookings.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/contact")}
            className="flex shrink-0 items-center gap-2 rounded-full text-xs font-medium tracking-[0.16em] uppercase"
          >
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
            <span>Speak with Concierge</span>
          </Button>
        </div>
      </section>

      {/* 6. "RESERVE YOUR SANCTUARY" WIDGET */}
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="space-y-2">
          <span className="text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
            Reserve Today
          </span>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl md:text-5xl">
            Reserve your sanctuary.
          </h2>
          <p className="mx-auto max-w-md text-xs font-light text-muted-foreground sm:text-sm">
            Plan your tranquil getaway with flexible cancellation and guaranteed
            best rates when booking direct.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-border bg-card p-3 shadow-2xl sm:flex-row sm:p-4">
          <div className="flex w-full items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground sm:w-auto sm:border-r sm:border-b-0">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Dates: Oct 14 — Oct 18</span>
          </div>
          <div className="flex w-full items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground sm:w-auto sm:border-r sm:border-b-0">
            <Users className="h-4 w-4 text-primary" />
            <span>Guests: 2 Adults, 1 Room</span>
          </div>
          <Button
            variant="luxury"
            size="luxuryMd"
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto"
          >
            Check Availability
          </Button>
        </div>
      </section>
    </div>
  );
};
