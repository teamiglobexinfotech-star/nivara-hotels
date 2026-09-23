import { Separator } from "@base-ui/react";
import { format } from "date-fns";
import { IndianRupee, Users } from "lucide-react";

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

import type { RoomType } from "../roomType.types";

type ViewRoomTypeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType: RoomType;
};

export function ViewRoomTypeModal({
  open,
  onOpenChange,
  roomType,
}: ViewRoomTypeModalProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 sm:max-w-120">
          {/* Header */}
          <DialogHeader className="border-b px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-xl">{roomType.name}</DialogTitle>
                <DialogDescription>
                  Room type details and pricing information.
                </DialogDescription>
              </div>

              <Badge variant={roomType.isActive ? "default" : "secondary"}>
                {roomType.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6 px-6 py-5">
            {/* Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Capacity
                  </span>
                </div>
                <p className="text-2xl font-semibold">{roomType.capacity}</p>
                <p className="text-xs text-muted-foreground">Guests</p>
              </div>

              <div className="rounded-xl border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Base Price
                  </span>
                </div>
                <p className="text-2xl font-semibold">
                  ₹{roomType.basePrice.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Per night</p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Description</h3>

              {roomType.description ? (
                <p className="text-sm leading-6 text-muted-foreground">
                  {roomType.description}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No description available.
                </p>
              )}
            </div>

            <Separator />

            {/* Metadata */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Details</h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p>{format(roomType.createdAt, "dd MMM yyyy, hh:mm a")}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p>{format(roomType.updatedAt, "dd MMM yyyy, hh:mm a")}</p>
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
    </>
  );
}
