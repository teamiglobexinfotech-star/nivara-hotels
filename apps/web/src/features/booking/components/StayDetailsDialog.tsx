import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/lib/getInitials";
import type { AvailableRoom } from "@/types/room.types";
import type { Customer } from "@/types/customer.types";

const roomTypeOptions = [
  "Standard",
  "Deluxe",
  "Suite",
  "Family Suite",
  "Executive Suite",
  "Presidential Suite",
];

interface StayDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCustomer: Customer | null;
  checkInDate: string;
  setCheckInDate: (value: string) => void;
  checkOutDate: string;
  setCheckOutDate: (value: string) => void;
  roomType: string;
  setRoomType: (value: string) => void;
  searchResults: AvailableRoom[];
  onSearchAvailableRooms: () => void;
  onSelectRoom: (room: AvailableRoom) => void;
  onCancel: () => void;
}

export function StayDetailsDialog({
  open,
  onOpenChange,
  selectedCustomer,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  roomType,
  setRoomType,
  searchResults,
  onSearchAvailableRooms,
  onSelectRoom,
  onCancel,
}: StayDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-['DM_Sans'] text-2xl font-bold">
            Stay Details
          </DialogTitle>
          <DialogDescription className="font-['DM_Sans'] text-sm text-muted-foreground">
            Confirm the stay details for the selected guest before searching
            rooms.
          </DialogDescription>
        </DialogHeader>

        {selectedCustomer && (
          <div className="mb-4 rounded-xl border bg-muted/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {getInitials(selectedCustomer.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {selectedCustomer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedCustomer.phone}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  selectedCustomer.status === "ACTIVE" ? "secondary" : "outline"
                }
              >
                {selectedCustomer.status}
              </Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Customer ID: {selectedCustomer.customerId}
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Check-in date
            </label>
            <Input
              type="date"
              value={checkInDate}
              onChange={(event) => setCheckInDate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Check-out date
            </label>
            <Input
              type="date"
              value={checkOutDate}
              onChange={(event) => setCheckOutDate(event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Room type
          </label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 rounded-2xl border bg-muted/40 p-4">
            <h3 className="mb-3 text-base font-semibold text-foreground">
              Available Rooms
            </h3>

            <div className="space-y-3">
              {searchResults.map((room) => (
                <div
                  key={room.id}
                  className="rounded-xl border border-border bg-background p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">
                        Room {room.roomNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {room.roomTypeName} • Floor {room.floor}
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onSelectRoom(room)}
                    >
                      Select Room
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      ₹{room.nightlyRate.toLocaleString("en-IN")}/night
                    </span>
                    <span>
                      {room.occupancyStatus} • {room.housekeepingStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="mt-2 flex-row justify-end gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            className="gap-2"
            disabled={
              !selectedCustomer || !checkInDate || !checkOutDate || !roomType
            }
            onClick={onSearchAvailableRooms}
          >
            <CalendarDays className="h-4 w-4" />
            Search available rooms
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
