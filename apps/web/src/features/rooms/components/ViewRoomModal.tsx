import { format } from "date-fns";
import {
  Bed,
  Building2,
  Home,
  Icon,
  IndianRupee,
  Sparkles,
  Users,
} from "lucide-react";

import { ErrorModal } from "@/components/shared/ErrorModal";
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useRoom } from "../hooks/useRoom";

type ViewRoomModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function ViewRoomModal({ open, onOpenChange, id }: ViewRoomModalProps) {
  const { room, isLoading, isError, refetch } = useRoom(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return (
      <ErrorModal
        open={!isError}
        onOpenChange={onOpenChange}
        onRefetch={refetch}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-120">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl">
                Room {room?.roomNumber}
              </DialogTitle>

              <DialogDescription>
                {room?.name || room?.roomType.name} • Floor {room?.floor}
              </DialogDescription>
            </div>

            <Badge variant={room?.isActive ? "default" : "secondary"}>
              {room?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-5">
          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Occupancy</span>
              </div>

              <Badge variant="outline">{room?.occupancyStatus}</Badge>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Housekeeping
                </span>
              </div>

              <Badge variant="outline">{room?.housekeepingStatus}</Badge>
            </div>
          </div>

          <Separator />

          {/* Room Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Room Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Room Type
                  </span>
                </div>

                <p className="font-medium">{room?.roomType.name}</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Floor</span>
                </div>

                <p className="font-medium">{room?.floor}</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Capacity
                  </span>
                </div>

                <p className="font-medium">{room?.roomType.capacity} Guests</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-1 flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Base Price
                  </span>
                </div>

                <p className="font-medium">
                  ₹{room?.roomType.basePrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Amenities</h3>

            {room?.roomType.amenities.length ? (
              <div className="flex flex-wrap gap-2">
                {room?.roomType.amenities.map(({ amenity }) => (
                  <Badge
                    key={amenity.id}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    <Icon name={amenity.iconKey || "circle"} size="xs" />
                    {amenity.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No amenities available.
              </p>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Description</h3>

            <p className="text-sm leading-6 text-muted-foreground">
              {room?.description ||
                room?.roomType.description ||
                "No description available."}
            </p>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>
                  {room?.createdAt &&
                    format(room?.createdAt, "dd MMM yyyy, hh:mm a")}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p>
                  {room?.updatedAt &&
                    format(room?.updatedAt, "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
