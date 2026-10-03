import { z } from "zod";

export const paymentInfoSchema = z.object({
  totalAmount: z.coerce
    .number({ error: "Total amount is required" })
    .min(0, "Total amount cannot be negative"),
  tax: z.coerce
    .number({ error: "Tax is required" })
    .min(0, "Tax cannot be negative"),
  discount: z.coerce
    .number({ error: "Discount is required" })
    .min(0, "Discount cannot be negative"),
  roomCharge: z.coerce
    .number({ error: "Room charge is required" })
    .min(0, "Room charge cannot be negative"),
  payment: z.object({
    paymentMethod: z.enum(["cash", "card", "upi", "netbanking"], {
      error: "Please select a payment method",
    }),
    paymentStatus: z.enum(["pending", "paid", "failed", "refunded"], {
      error: "Please select a payment status",
    }),
    transactionId: z.string().trim().optional(),
  }),
});

export type PaymentInfo = z.infer<typeof paymentInfoSchema>;
