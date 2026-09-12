import {
  IndianRupee,
  BookOpen,
  ConciergeBell,
  History,
  Utensils,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import IMAGE_1 from "@/assets/plush_sofa.png";
import IMAGE_2 from "@/assets/terracotta_linens.png";
import IMAGE_3 from "@/assets/wood_king.png";

const highlights = [
  {
    icon: BookOpen,
    title: "Our Philosophy",
    description:
      "Unhurried warmth and authentic Awadhi tehzeeb honoring every guest's individual rhythm.",
  },
  {
    icon: IndianRupee,
    title: "Craft & Architecture",
    description:
      "Handcrafted jali masonry, fluted sandstone colonnades, and acoustic bedroom sanctuaries.",
  },
  {
    icon: Utensils,
    title: "Gastronomy",
    description:
      "Dum-pukht royal recipes, slow-roasted spices, and farm-sourced pairings curated by master chefs.",
  },
  {
    icon: ConciergeBell,
    title: "Timeless Service",
    description:
      "Dedicated personal butlers and anticipatory concierge attuned to your exact lifestyle.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-card p-6 py-10 sm:p-8 md:p-12">
      <div className="flex flex-col items-center gap-12 lg:flex-row">
        {/* Content */}
        <div className="flex w-full flex-col gap-6 lg:w-3/5">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-primary">
              <History className="size-4.5" />

              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                About Us — Our Heritage & Story
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A Century of Awadhi Grace & Regal Hospitality
            </h2>

            <p className="mt-1 text-lg font-medium text-muted-foreground">
              Founded in 1924 · Reimagined for the Discerning Global Traveler
            </p>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Established a century ago during the golden zenith of Awadhi
              cultural renaissance, Nivara Hotels began as an aristocratic
              private haveli dedicated to the courtly art of{" "}
              <em>mehmaan-nawazi</em> (gracious hosting). Lovingly preserved
              through four generations, every fluted sandstone pillar, intricate
              carved teak doorframe, and tranquil central courtyard whispers
              tales of royal poets, connoisseurs, and dignitaries who once
              walked these halls.
            </p>

            <p>
              Today, Nivara blends the soul of vintage Lucknow with bespoke
              contemporary indulgences. Beneath jasmine-draped arched verandas
              and hand-chiseled jali screens, guests experience our signature{" "}
              <em>tehzeeb</em>—intuitive, discreet, and heartwarming hospitality
              that makes you feel both like royalty and truly at home.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="border-border/60 bg-muted/40 shadow-none"
                >
                  <CardContent className="flex flex-col gap-2 p-4">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid w-full grid-cols-2 gap-4 lg:w-2/5">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <div className="aspect-4/5 overflow-hidden rounded-xl bg-muted">
              <img
                src={IMAGE_1}
                alt="Awadhi Architecture Arches & Courtyard"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <Card className="border-0 bg-primary text-primary-foreground shadow-none">
              <CardContent className="flex flex-col justify-center p-4">
                <span className="text-3xl font-bold">1924</span>

                <span className="text-xs font-medium tracking-wider text-primary-foreground/70 uppercase">
                  Preserved Heritage Estate
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4 pt-6">
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={IMAGE_2}
                alt="Bespoke Handcrafted Luxury Detail"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="aspect-4/5 overflow-hidden rounded-xl bg-muted">
              <img
                src={IMAGE_3}
                alt="Courtyard Gardens and Water Pavilion"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
