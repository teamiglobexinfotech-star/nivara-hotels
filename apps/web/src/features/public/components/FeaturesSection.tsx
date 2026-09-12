import {
  AirVent,
  CarFront,
  ConciergeBell,
  Utensils,
  WashingMachine,
  Wifi,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description:
      "Seamless 500 Mbps connectivity across all rooms and courtyard pavilions.",
  },
  {
    icon: AirVent,
    title: "Climate Control",
    description:
      "Precision individual whisper-quiet climate control in every suite.",
  },
  {
    icon: Utensils,
    title: "All-Day & In-Room Dining",
    description:
      "Curated Awadhi flavors and global culinary classics prepared fresh.",
  },
  {
    icon: ConciergeBell,
    title: "Dedicated Concierge",
    description: "24/7 Front desk and personalized local itinerary curation.",
  },
  {
    icon: WashingMachine,
    title: "Housekeeping & Laundry",
    description: "Twice-daily housekeeping service and express dry cleaning.",
  },
  {
    icon: CarFront,
    title: "Secure Valet & EV Hub",
    description:
      "Complimentary on-site monitored guest parking and EV charging.",
  },
];

export function AmenitiesSection() {
  return (
    <section id="amenities" className="w-full bg-card p-6 py-10 sm:p-8 md:p-12">
      {/* Section heading */}
      <div className="mb-10 flex max-w-2xl flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Effortless Comfort
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Hotel Amenities & Facilities
        </h2>

        <p className="text-base text-muted-foreground">
          Thoughtful comforts designed into every moment of your stay.
        </p>
      </div>

      {/* Amenities grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = amenity.icon;

          return (
            <Card
              key={amenity.title}
              className="border-border/50 bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-3 p-6">
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6.5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-foreground">
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {amenity.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
