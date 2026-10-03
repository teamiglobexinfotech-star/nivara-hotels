import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BookingReducerState } from "../booking.types";

interface ReviewAndConfirmProps {
  value?: Partial<BookingReducerState>;
}

export function ReviewAndConfirm({ value }: ReviewAndConfirmProps) {
  const customer = value?.customer;
  const stayAndRoom = value?.stayAndRoom;
  const guest = value?.guest;
  const payment = value?.payment;

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        REVIEW BOOKING
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Customer
            </h3>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto gap-1.5 px-0 py-0 text-xs font-medium text-primary hover:text-primary/90"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">
                {customer?.fullName ?? "Not selected"}
              </p>
              <p className="text-sm text-muted-foreground">
                {customer?.phone ?? "No phone number"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Stay &amp; Room
            </h3>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto gap-1.5 px-0 py-0 text-xs font-medium text-primary hover:text-primary/90"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">
                {stayAndRoom?.roomType?.name ?? "No room selected"}
              </p>
              <p className="text-sm text-muted-foreground">
                {stayAndRoom?.roomNumber
                  ? `Room ${stayAndRoom.roomNumber}`
                  : "Room not assigned"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Guest
            </h3>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto gap-1.5 px-0 py-0 text-xs font-medium text-primary hover:text-primary/90"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <p className="text-base font-medium text-foreground">
              {guest
                ? `${guest.totalGuests} ${guest.totalGuests === 1 ? "Guest" : "Guests"}`
                : "No guest details"}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Payment
            </h3>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto gap-1.5 px-0 py-0 text-xs font-medium text-primary hover:text-primary/90"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <p className="text-base font-medium text-foreground">
              {payment
                ? `${payment.paymentMethod.toUpperCase()} · ₹${payment.totalAmount.toLocaleString("en-IN")} ${payment.paymentStatus}`
                : "No payment details"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
