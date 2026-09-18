import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import type { AvailableRoom } from "@/types/room.types";

interface BookingSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRoom: AvailableRoom | null;
  roomCharge: number;
  discount: number;
  tax: number;
  total: number;
  initialPayment: string;
  setInitialPayment: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  balance: number;
  onCancel: () => void;
  onCreateBooking: () => void;
}

export function BookingSummaryDialog({
  open,
  onOpenChange,
  selectedRoom,
  roomCharge,
  discount,
  tax,
  total,
  initialPayment,
  setInitialPayment,
  paymentMethod,
  setPaymentMethod,
  balance,
  onCancel,
  onCreateBooking,
}: BookingSummaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] w-[min(92vw,480px)] overflow-y-auto p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-['DM_Sans'] text-2xl font-bold">
            Book Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2 rounded-xl border bg-muted/40 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Room</span>
              <span>₹{roomCharge.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Discount</span>
              <span>₹{discount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Tax</span>
              <span>₹{tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="my-2 h-px bg-border" />
            <div className="flex items-center justify-between text-base font-semibold text-foreground">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {selectedRoom && (
            <div className="rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground">
              Selected room: Room {selectedRoom.roomNumber} •{" "}
              {selectedRoom.roomTypeName}
            </div>
          )}

          <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Initial Payment
              </label>
              <Input
                type="number"
                min={0}
                value={initialPayment}
                onChange={(event) => setInitialPayment(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Method
              </label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm">
              <span className="text-muted-foreground">Balance</span>
              <span className="font-semibold text-foreground">
                ₹{balance.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 flex-row justify-end gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onCreateBooking}>
            Create Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
