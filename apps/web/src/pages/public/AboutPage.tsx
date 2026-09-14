import React from "react";
import {
  Sparkles,
  Compass,
  ShieldCheck,
  Heart,
  Leaf,
  Sun,
  Droplets,
  Award,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      number: "01",
      title: "Architectural Restraint",
      description:
        "We reject excessive ornamentation in favor of monolithic curves, generous arches, and unhurried negative space that calms the human nervous system.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Tactile Materiality",
      description:
        "Every surface your skin touches is authentic—raw unpolished sandstone, hand-loomed raw linen, reclaimed teak, and hand-beaten bronze hardware.",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Unobtrusive Presence",
      description:
        "Our service philosophy is anticipation without interruption. Needs are silently met before you realize they have arisen.",
      icon: Heart,
    },
    {
      number: "04",
      title: "A Sense of Place",
      description:
        "We are not a generic global template dropped into a landscape. Nivara breathes with its native earth, seasonal harvest, and centuries-old masonry lore.",
      icon: ShieldCheck,
    },
  ];

  const curators = [
    {
      name: "Maya Sen",
      role: "Founder & Creative Director",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      bio: "Former architectural historian whose travels across the sub-continent birthed the Nivara sanctuary ethos.",
    },
    {
      name: "Julian Alvarez",
      role: "Principal Architect · Studio Altar",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "Master of light and shadow, renowned for seamless indoor-outdoor transitions and monolithic sandstone archways.",
    },
    {
      name: "Chef Aarav Mehta",
      role: "Executive Culinary Director",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      bio: "Pioneering micro-seasonal heirloom gastronomy harvested daily from our bio-dynamic estate greenhouse.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 text-foreground">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 text-center sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase sm:text-[11px]">
              About Nivara Hotels
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-[1.12] font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Rooted in stillness. <br />
            <span className="font-normal text-primary italic">
              Crafted with purpose.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed font-light text-muted-foreground sm:text-base md:text-lg">
            A sanctuary born from the conviction that the most memorable places
            in the world are those that give you permission to slow down.
          </p>
        </div>

        {/* Master Arch Showcase Image */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-t-[140px] rounded-b-3xl border border-primary/20 shadow-2xl shadow-background/60 sm:aspect-21/9 sm:rounded-t-[220px]">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
              alt="The North Colonnade at Nivara"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 flex flex-col justify-between gap-2 text-left sm:flex-row sm:items-end">
              <div>
                <p className="font-serif text-lg text-foreground sm:text-xl">
                  The North Colonnade
                </p>
                <p className="text-xs text-muted-foreground">
                  Hand-sculpted stone arches designed by Studio Altar ·
                  Completed 2016
                </p>
              </div>
              <span className="w-fit rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-[10px] tracking-widest text-primary uppercase backdrop-blur-md">
                Pritzker Honored
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE STORY / FOUNDING ETHOS */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-5">
            <SectionHeading
              eyebrow="Origins & Vision"
              title="Hospitality stripped"
              italicWord="of haste."
            />
            <p className="font-serif text-xl leading-snug font-light text-foreground sm:text-2xl">
              "We built Nivara for people who measure wealth not in speed, but
              in depth of attention."
            </p>
            <div className="space-y-1 rounded-2xl border border-border bg-card p-4">
              <p className="font-serif text-base text-primary">Maya Sen</p>
              <p className="text-[11px] tracking-wider text-muted-foreground uppercase">
                Founder & Keeper of Ethos
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed font-light text-muted-foreground sm:text-base lg:col-span-7">
            <p>
              In 2015, Nivara took shape among the quiet rolling ridges of the
              Western Ghats foothills. We began with a single question: What if
              a hotel was not merely a vessel for sleep between itineraries, but
              an architectural destination that slowed your heart rate the
              moment you crossed its threshold?
            </p>
            <p>
              Rather than constructing high-density multi-story blocks, we laid
              out 32 independent pavilion sanctuaries separated by whispering
              bamboo groves and trickling water courses. We engaged local
              stonemasons whose families have worked the regional pink-hued
              granite for generations, ensuring every curve honors vernacular
              geometry.
            </p>
            <p>
              Today, Nivara stands as an international beacon for thoughtful,
              quiet luxury—a retreat cherished by writers, architects,
              travelers, and those who simply yearn to hear the dawn chorus
              uninterrupted by city traffic.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl space-y-3 text-center">
          <SectionHeading
            eyebrow="Our Foundation"
            title="The Pillars of"
            italicWord="Nivara."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="flex flex-col justify-between space-y-6 rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-primary/40">
                      {pillar.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-card-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SUSTAINABILITY & STEWARDSHIP */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            <span className="block text-[10px] font-semibold tracking-[0.24em] text-accent uppercase">
              Environmental Stewardship
            </span>
            <h3 className="font-serif text-3xl text-card-foreground sm:text-4xl">
              Sanctuary for the earth, not just our guests.
            </h3>
            <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
              We operate with a regenerative footprint. We hold the land in
              trust for the native flora and wildlife that have inhabited these
              valleys for millennia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div className="space-y-2 rounded-2xl border border-border bg-background p-5">
              <Sun className="h-5 w-5 text-primary" />
              <h4 className="font-serif text-lg text-foreground">
                100% Solar Daylight
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Complete daylight energy supplied by our hidden photovoltaic
                canopy.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-border bg-background p-5">
              <Droplets className="h-5 w-5 text-primary" />
              <h4 className="font-serif text-lg text-foreground">
                Zero Water Waste
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Natural reed-bed filtration recycling all gray water into
                botanical gardens.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-border bg-background p-5">
              <Leaf className="h-5 w-5 text-primary" />
              <h4 className="font-serif text-lg text-foreground">
                Farm-to-Table
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Estate orchards and heirloom seed preservation providing 80% of
                dining produce.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-border bg-background p-5">
              <Award className="h-5 w-5 text-primary" />
              <h4 className="font-serif text-lg text-foreground">
                LEED Platinum
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Ranked in top 1% globally for sustainable luxury hospitality
                architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CURATORS & LEADERSHIP */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The Custodians"
            title="The minds behind"
            italicWord="the retreat."
          />
          <p className="max-w-md text-xs font-light text-muted-foreground sm:text-sm md:text-right">
            Meet the visionaries, architectural masters, and culinary artists
            who curate every sensory detail of your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {curators.map((curator, idx) => (
            <div
              key={idx}
              className="space-y-5 rounded-3xl border border-border bg-card p-6"
            >
              <div className="aspect-4/5 overflow-hidden rounded-2xl bg-background">
                <img
                  src={curator.image}
                  alt={curator.name}
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl text-card-foreground">
                  {curator.name}
                </h4>
                <p className="text-[11px] font-medium tracking-wider text-primary uppercase">
                  {curator.role}
                </p>
                <p className="pt-2 text-xs leading-relaxed font-light text-muted-foreground">
                  {curator.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <CTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};
