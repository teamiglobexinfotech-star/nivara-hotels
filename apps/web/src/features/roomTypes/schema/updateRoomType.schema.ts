import { z } from "zod";

export const updateRoomTypeSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter a room type name.").optional(),
    description: z
      .string()
      .trim()
      .min(1, "Please enter a description.")
      .optional(),
    capacity: z.coerce
      .number("Please enter the room capacity.")
      .int("Capacity must be a whole number.")
      .positive("Capacity must be greater than 0.")
      .optional(),
    basePrice: z.coerce
      .number("Please enter the base price.")
      .int("Base price must be a whole number.")
      .nonnegative("Base price cannot be less than 0.")
      .optional(),
    isActive: z.boolean().optional(),
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export type UpdateRoomType = z.infer<typeof updateRoomTypeSchema>;
