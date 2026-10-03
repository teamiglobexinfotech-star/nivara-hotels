import { Check, Mail, Phone, Search } from "lucide-react";
import { useState } from "react";

import { IconButton } from "@/components/shared/IconButton";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useCheckAvailabilityRoomsFacade } from "../hooks/useCheckAvailabilityRooms";
import type { AvailabilityQuery, RoomAvailableItem } from "../room.types";

export function StayAndRoom({
  onChange,
  value,
  availability,
  onAvailability,
}: {
  onChange?: (room: RoomAvailableItem) => void;
  value?: RoomAvailableItem;
  onAvailability?: (query: AvailabilityQuery) => void;
  availability?: AvailabilityQuery;
}) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { handleSubmit, submit, register, errors, control, items, getValues } =
    useCheckAvailabilityRoomsFacade();

  const handleSelect = (room: RoomAvailableItem) => {
    onAvailability?.(getValues());
    onChange?.(room);
    setSelectedRoomId(room.id);
  };

  const options = Array.from({ length: 10 }).map((_, i) => ({
    id: (i + 1).toString(),
    name: (i + 1).toString(),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 md:py-6">
      <form onSubmit={handleSubmit(submit)} className="mb-4 space-y-3">
        <div className="grid items-center gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-border bg-card p-3 shadow-sm">
            <InputField
              type="date"
              {...register("checkIn", { value: availability?.checkIn })}
              label="Check-in"
              error={errors.checkIn?.message}
            />
          </Card>
          <Card className="border-border bg-card p-3 shadow-sm">
            <InputField
              type="date"
              {...register("checkOut", { value: availability?.checkOut })}
              label="Check-out"
              error={errors.checkOut?.message}
            />
          </Card>

          <Card className="border-border bg-card p-3 shadow-sm">
            <SelectField
              name="capacity"
              label="Guest"
              control={control}
              options={options}
              error={errors.capacity?.message}
            />
          </Card>

          <div className="flex items-end">
            <IconButton type="submit" className="">
              <Search className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </form>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground md:text-2xl">
          Available Rooms
        </h2>
        <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-xs">
          {items.length} Rooms
        </Badge>
      </div>

      <ScrollArea className="max-h-72 overflow-y-auto">
        <div className="space-y-2">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No available rooms.
            </div>
          ) : (
            items.map((room) => {
              const isSelected = selectedRoomId === room.id;

              return (
                <Card
                  key={room.id}
                  className={`border transition-colors hover:border-ring ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <CardContent className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between md:p-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-foreground md:text-lg">
                        {room.roomType.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Room {room.roomNumber} • {room.roomType.capacity} Guests
                        • {room.name ?? "King Bed"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 md:justify-end">
                      <div className="text-left md:text-right">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-foreground">
                            ₹{room.roomType.basePrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
                            /night
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className="h-8 rounded-full px-4 md:h-9"
                        onClick={() => handleSelect(room)}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>

      {value && (
        <Card className="mt-4 border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium">{value.name}</p>
                <Badge variant="secondary">Selected</Badge>
              </div>

              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 truncate">
                  <Mail className="h-3 w-3" />
                  {value.roomNumber}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {value.roomType?.basePrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
