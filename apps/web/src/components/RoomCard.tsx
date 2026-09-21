import { Maximize2,Plus, Users } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Room } from "../types";

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
  featured?: boolean;
  className?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onSelect,
  featured = false,
  className = "",
}) => {
  return (
    <Card
      variant={featured ? "featured" : "hotel"}
      className={`group relative flex flex-col overflow-hidden ${className}`}
    >
      {/* Image Container with arch-inspired framing */}
      <div className="relative p-2.5 sm:p-3">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-background sm:aspect-16/11">
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-background/20" />

          {/* Luxury Tag Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="luxury">{room.tag}</Badge>
          </div>

          {/* Featured pill badge if featured */}
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge
                variant="default"
                className="rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.16em] uppercase"
              >
                Patron Favorite
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between space-y-6 p-6 sm:p-7">
        <div className="space-y-3">
          {/* Header & Price */}
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
            <h3 className="font-serif text-xl text-card-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {room.name}
            </h3>
            <div className="text-left sm:text-right">
              <span className="block text-[10px] tracking-wider text-muted-foreground uppercase">
                from{" "}
                <span className="font-serif text-base font-medium text-primary sm:text-lg">
                  {room.priceFormatted}
                </span>{" "}
                / night
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
            {room.shortDescription}
          </p>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="h-3 w-3 text-primary" />
              <span>
                {room.sizeM2} m² / {room.sizeSqFt} sq ft
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-primary" />
              <span>
                {room.guests} Guests ({room.bedType})
              </span>
            </div>
            {room.features.slice(0, 2).map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 truncate text-[10px] text-muted-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button using shadcn Button */}
        <div>
          <Button
            variant={featured ? "luxury" : "luxuryOutline"}
            size="luxuryMd"
            className="w-full"
            onClick={() => onSelect(room)}
          >
            <span>Reserve Suite</span>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
