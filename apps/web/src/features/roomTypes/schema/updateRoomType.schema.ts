import { z } from "zod";

export const updateRoomTypeSchema = z
  .object({
    name: z.string().trim().min(1, "Room type name is required."),
    description: z.string().trim().min(1, "Description is required."),
    capacity: z
      .number({
        message: "Capacity must be a number.",
      })
      .int("Capacity must be a whole number.")
      .positive("Capacity must be greater than 0."),
    basePrice: z
      .number({
        message: "Base price must be a number.",
      })
      .nonnegative("Base price cannot be negative."),
    isActive: z.boolean(),
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export type UpdateRoomType = z.infer<typeof updateRoomTypeSchema>;
