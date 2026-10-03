import { z } from "zod";

export const guestSchema = z.object({
  primaryGuest: z.object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name is too long"),
    age: z.coerce
      .number("Age is required")
      .int("Age must be a whole number")
      .min(1, "Age must be at least 1")
      .max(120, "Age cannot exceed 120"),

    gender: z
      .enum(["male", "female", "other"], {
        error: "Please select a gender",
      })
      .default("male"),
  }),
  totalGuests: z.coerce
    .number("Total guests is required")
    .int("Total guests must be a whole number")
    .min(1, "At least 1 guest is required")
    .max(20, "Maximum 20 guests allowed"),
  specialRequest: z
    .string()
    .trim()
    .max(500, "Special request cannot exceed 500 characters")
    .optional(),
});

export type GuestInput = z.infer<typeof guestSchema>;
