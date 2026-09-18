import { Plus } from "lucide-react";
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

interface GuestInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCustomer: Customer | null;
  selectedRoom: AvailableRoom | null;
  additionalGuests: Array<{
    id: number;
    name: string;
    age: string;
    gender: string;
    idProof: string;
  }>;
  onAddAdditionalGuest: () => void;
  onUpdateAdditionalGuest: (
    id: number,
    field: "name" | "age" | "gender" | "idProof",
    value: string
  ) => void;
  onSaveBooking: () => void;
  onCancel: () => void;
}

export function GuestInformationDialog({
  open,
  onOpenChange,
  selectedCustomer,
  selectedRoom,
  additionalGuests,
  onAddAdditionalGuest,
  onUpdateAdditionalGuest,
  onSaveBooking,
  onCancel,
}: GuestInformationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] w-[min(92vw,640px)] overflow-y-auto p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-['DM_Sans'] text-2xl font-bold">
            Guest Information
          </DialogTitle>
          <DialogDescription className="font-['DM_Sans'] text-sm text-muted-foreground">
            Add guest details for the selected room reservation.
          </DialogDescription>
        </DialogHeader>

        {selectedRoom && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-foreground">
            <span className="font-medium">Selected room:</span> Room{" "}
            {selectedRoom.roomNumber} • {selectedRoom.roomTypeName} • Floor{" "}
            {selectedRoom.floor}
          </div>
        )}

        <div className="space-y-5">
          <div className="rounded-xl border bg-muted/40 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Primary Guest
              </h3>
              <Badge variant="secondary">Primary</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  Name
                </label>
                <Input
                  value={selectedCustomer?.name ?? "Rahul Sharma"}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Age
                </label>
                <Input type="number" defaultValue={28} min={1} max={120} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Gender
                </label>
                <Select defaultValue="Male">
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  ID Proof
                </label>
                <Input value="XXXXXXXX" readOnly />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/40 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-foreground">
                Additional Guests
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={onAddAdditionalGuest}
              >
                <Plus className="h-4 w-4" />
                Add Guest
              </Button>
            </div>

            <div className="space-y-3">
              {additionalGuests.length === 0 ? (
                <div className="rounded-xl border border-dashed p-3 text-sm text-muted-foreground">
                  No additional guests added.
                </div>
              ) : (
                additionalGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="grid gap-3 rounded-xl border bg-background p-3 md:grid-cols-2"
                  >
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        value={guest.name}
                        onChange={(event) =>
                          onUpdateAdditionalGuest(
                            guest.id,
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Guest name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Age
                      </label>
                      <Input
                        type="number"
                        value={guest.age}
                        min={1}
                        max={120}
                        onChange={(event) =>
                          onUpdateAdditionalGuest(
                            guest.id,
                            "age",
                            event.target.value
                          )
                        }
                        placeholder="Age"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Gender
                      </label>
                      <Select
                        value={guest.gender}
                        onValueChange={(value) =>
                          onUpdateAdditionalGuest(guest.id, "gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-foreground">
                        ID Proof
                      </label>
                      <Input
                        value={guest.idProof}
                        onChange={(event) =>
                          onUpdateAdditionalGuest(
                            guest.id,
                            "idProof",
                            event.target.value
                          )
                        }
                        placeholder="XXXXXXXX"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 flex-row justify-end gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className="gap-2" onClick={onSaveBooking}>
            Save Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
