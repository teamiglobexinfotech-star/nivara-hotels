import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RoomTypeResponse } from "../room-type.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ViewRoomTypeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType: RoomTypeResponse;
};

export function ViewRoomTypeModal({
  open,
  onOpenChange,
  roomType,
}: ViewRoomTypeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {roomType.name}
          </DialogTitle>
          <DialogDescription>
            Room type details and pricing information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-2">
          {/* Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Status
              </p>
              <Badge
                variant={roomType.status === "ACTIVE" ? "default" : "secondary"}
                className="mt-2"
              >
                {roomType.status}
              </Badge>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Capacity
              </p>
              <p className="mt-2 text-2xl font-semibold">{roomType.capacity}</p>
              <p className="text-xs text-muted-foreground">Guests</p>
            </div>
          </div>

          {/* Price */}
          <div className="rounded-xl border p-4">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Base Price
            </p>
            <p className="mt-2 text-3xl font-bold">
              ₹{Number(roomType.basePrice).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">per night</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Description</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {roomType.description || "No description provided."}
            </p>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-end gap-x-4">
          <DialogClose>
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => onOpenChange}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="button">Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
