import { z } from "zod";

export const createRoomTypeSchema = z
  .object({
    name: z.string().trim().min(1, "Room type name is required."),
    description: z.string().trim().min(1, "Description is required."),
    capacity: z.coerce
      .number({
        message: "Capacity must be a number.",
      })
      .int("Capacity must be a whole number.")
      .positive("Capacity must be greater than 0."),
    basePrice: z.coerce
      .number({
        message: "Base price must be a number.",
      })
      .int("Base Price must be a whole number.")
      .nonnegative("Base price cannot be negative."),
    isActive: z.boolean(),
    images: z
      .array(
        z.instanceof(File, { message: "Each image must be a valid file." })
      )
      .min(1, "At least one image is required."),
  })
  .strict();

export type CreateRoomType = z.infer<typeof createRoomTypeSchema>;
