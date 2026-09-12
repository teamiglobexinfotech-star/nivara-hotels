import { ArrowRight, CalendarDays, Crown, Hotel, Bed } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const rooms = [
  {
    name: "Standard Heritage Room",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1UqcOYBbv8zp0dPuFGelADlcbPg3MUcuyBOBNtJB3jHNstwkUuyhAG6f3H26itUHPkdpxsjw6wKJZSaU9qWs5Lk2-lR9IfpkFFk-9hGRgmwK9_juxsjwxJ8LSWjpDmu17i7iPHylpa0SuXrdSIIHqtW4T5TJNmgJQgHlHGqrSqLqYMTaivF2ZbtapqbZ2Nnbudw0bObHI0uJVhakiBmp_AGdaA7F0obvq8M4qhkIuZ4-mZKVBFz",
    alt: "Standard Heritage Room",
    meta: "Queen Bed • 320 sq.ft • Courtyard View",
    price: "₹2,499",
    description:
      "A cozy, light-filled sanctuary blending clean modern lines with warm terracotta tones, crisp linens, and serene acoustic isolation.",
    amenities: ["High-Speed Wi-Fi", "Climate Control", "Smart TV", "Hot Water"],
    badge: {
      label: "Most Popular",
      icon: Hotel,
    },
  },
  {
    name: "Deluxe Courtyard Room",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1UVnJ1R3DnF7Qj0j2JgUCbD_csMQTDWOcss0jc_2SJeuQEPG7IVRLtQJ8p0fKqWFWLY2QIjBh0orH44DP06S-WFKnWN9e0lofSnY57_wLNc8x8NYc8ivbbe8Nh9IWIa0D8_KcJNiDxpZJBjxjmseHa1yXjcA2eZ0CP5gIjvI9YytDeZGDx9Mo2ZDaLvOeklM-wplKzOTU3vQhXb31q9Z-QIbbISLvEHFF63-qsMavi5VzXlAMZYsC7Lugp6",
    alt: "Deluxe Courtyard Room",
    meta: "King Bed • 480 sq.ft • Garden Balcony",
    price: "₹3,999",
    description:
      "Spacious elegance featuring an authentic carved-wood king bed, private garden-facing balcony, and opulent brass accents.",
    amenities: ["King Bed", "Private Balcony", "Mini Fridge", "Rain Shower"],
  },
  {
    name: "Executive Palace Suite",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1UMwZWkd7pnZQfygaI4mCHyfgDNFI7V3CHPt19TNdSiN-SlejL9ffzQ6yS8TXWW-aslX1-xgcPTINuN0EausvJ6q0hGCIXOhHD8qyDrnTo09ZAU3FJsc8J-gqlkCIb-1B3u5UdlwSohf_eqfSfIhS4cNTRdPcAnYZ85nEcKhS_uBob8sR5Oy-rN1pFTqBVK3S6JUwWCdnTVaOObWhVlKaC8LglKorB7fEFd3RXxVsikWmtLJxc3iFXYaif2",
    alt: "Executive Palace Suite",
    meta: "Master King • 750 sq.ft • Palace Courtyard",
    price: "₹6,499",
    description:
      "Palatial living with a separate lounging salon, handcrafted jali arches, deep soaking marble tub, and complimentary breakfast.",
    amenities: [
      "Separate Lounge",
      "Soaking Tub",
      "Breakfast Included",
      "Butler Service",
    ],
    badge: {
      label: "Best Value",
      icon: Crown,
    },
  },
];

export function RoomsSection() {
  return (
    <section id="rooms" className="w-full py-10">
      {/* Section Header */}
      <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-2 text-center">
        <div className="inline-flex items-center justify-center gap-2 text-primary">
          <Bed className="size-4.5" />

          <span className="text-xs font-semibold tracking-widest uppercase">
            Accommodation & Sanctuaries
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our Rooms
        </h2>

        <p className="text-base leading-relaxed text-muted-foreground">
          From restful courtyard rooms to sprawling heritage suites — each
          meticulously appointed with handcrafted Awadhi furnishings, plush
          linens, and restorative comfort.
        </p>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 gap-8 px-4 sm:px-10 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card
            key={room.name}
            className="group flex flex-col overflow-hidden rounded-2xl border-border bg-card py-0 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
              <img
                src={room.image}
                alt={room.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Room Badge */}
              {room.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="gap-1 shadow-sm">
                    <room.badge.icon className="size-3.5" />
                    {room.badge.label}
                  </Badge>
                </div>
              )}

              {/* Price */}
              <div className="absolute right-4 bottom-4 rounded-lg bg-primary/90 px-3 py-1.5 text-primary-foreground shadow-md backdrop-blur-md">
                <span className="font-bold">{room.price}</span>

                <span className="ml-1 text-xs font-normal text-primary-foreground/70">
                  / night
                </span>
              </div>
            </div>

            {/* Content */}
            <CardContent className="flex flex-1 flex-col justify-between gap-4 p-6">
              <div className="flex flex-col gap-2">
                {/* Meta */}
                <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                  {room.meta}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground">
                  {room.name}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {room.amenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant="secondary"
                    className="rounded-md px-2.5 py-1 text-[11px] font-medium"
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-3">
                <Link to="#contact">
                  <Button className="flex-1 rounded-xl">
                    Book Now
                    <CalendarDays className="size-4" />
                  </Button>
                </Link>

                <Link to="#contact">
                  <Button variant="outline" className="rounded-xl">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All */}
      <div className="mt-8 text-center">
        <Link to="#rooms">
          <Button
            variant="link"
            className="gap-2 p-0 text-base font-semibold text-primary"
          >
            View All 120+ Rooms & Suites
            <ArrowRight className="size-4.5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
