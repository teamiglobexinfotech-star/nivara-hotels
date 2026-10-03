import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { Button } from "@/components/ui/button";

import type { BookingReducerState } from "../../bookings/booking.types";
import type { PaymentInfo } from "../payment.types";
import { paymentInfoSchema } from "../schema/payment.schema";

export type PaymentMethod = "cash" | "card" | "upi";
export type PaymentStatus = "paid" | "pending" | "partial";

interface PaymentInfoProps {
  value?: Partial<PaymentInfo>;
  onChange?: (value: PaymentInfo) => void;
  room: BookingReducerState["stayAndRoom"];
}

export function PaymentInfo({ room, onChange, value }: PaymentInfoProps) {
  const roomCharges = () => {
    if (room?.query) {
      const day =
        new Date(String(room.query?.checkOut)).getDay() -
        new Date(String(room.query?.checkIn)).getDay();
      return day * room.room.roomType.basePrice;
    }
  };
  console.log(roomCharges(), room?.query, room);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(paymentInfoSchema),
    defaultValues: {
      roomCharge: roomCharges(),
      totalAmount:
        parseInt(roomCharges()?.toString() || "0") + (value?.tax ?? 0),
      tax: 0,
      discount: 0,
      payment: {
        paymentMethod: "cash",
        paymentStatus: "paid",
      },
    },
  });

  const handleSubmitForm = (data: PaymentInfo) => {
    onChange?.(data);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-2xl font-semibold text-foreground">Payment</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete payment information for this booking
        </p>
      </div>

      <form className="space-y-6 p-6" onSubmit={handleSubmit(handleSubmitForm)}>
        <div>
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Invoice Summary
          </h3>

          <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
            <div className="space-y-3 p-4 text-sm text-foreground">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Room Charges</span>
                <span>₹{roomCharges()?.toLocaleString("en-IN")}</span>
              </div>

              <InputField
                type="number"
                label="Tax"
                placeholder="e.g. 2160"
                {...register("tax")}
                disabled={true}
                error={errors.tax?.message}
              />

              <InputField
                type="number"
                label="Discount"
                placeholder="e.g. 2160"
                disabled={true}
                {...register("discount")}
                error={errors.discount?.message}
              />
            </div>
          </div>
        </div>

        <InputField
          type="number"
          label="Payment Amount"
          placeholder="e.g. 1000"
          {...register("totalAmount")}
          disabled={true}
          error={errors.totalAmount?.message}
        />

        <SelectField
          label="Payment Method"
          control={control}
          name="payment.paymentMethod"
          options={[]}
        />

        <InputField
          type="text"
          label="Transaction ID (optional)"
          placeholder="e.g. TXN-123456"
          {...register("payment.transactionId")}
          error={errors.payment?.transactionId?.message}
        />

        <div className="mt-4 flex w-full justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
