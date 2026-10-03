import { z } from "zod";

export const roomAvailabilitySchema = z
  .object({
    checkIn: z.coerce.date("Invalid check-in date"),
    checkOut: z.coerce.date("Invalid check-out date"),
    capacity: z.coerce
      .number("Capacity is required")
      .int("Capacity must be a whole number")
      .min(1, "Capacity must be at least 1"),
  })
  .strict()
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type RoomAvailabilityDto = z.infer<typeof roomAvailabilitySchema>;
