import { z } from "zod";

export const createRoomTypeSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter a room type name."),
    description: z.string().trim().min(1, "Please enter a description."),
    capacity: z.coerce
      .number("Please enter the room capacity.")
      .int("Capacity must be a whole number.")
      .positive("Capacity must be greater than 0."),
    basePrice: z.coerce
      .number("Please enter the base price.")
      .int("Base price must be a whole number.")
      .nonnegative("Base price cannot be less than 0."),
    isActive: z.boolean().default(true),
  })
  .strict();

export type CreateRoomType = z.infer<typeof createRoomTypeSchema>;
