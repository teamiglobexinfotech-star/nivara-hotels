import { z } from "zod";

const name = z
  .string("Room type name is required")
  .min(2, "Room type name must be at least 2 characters")
  .max(100, "Room type name must be 100 characters or less");
const description = z
  .string("Description must be a string")
  .max(500, "Description must be 500 characters or less")
  .optional();

const capacity = z.coerce
  .number("Capacity must be a valid number.")
  .int("Capacity must be a whole number.")
  .positive("Capacity must be greater than 0.");

const basePrice = z.coerce
  .number("Base price must be a valid number.")
  .nonnegative("Base price cannot be negative.");
const status = z.enum(["ACTIVE", "INACTIVE"], {
  message: "Status must be ACTIVE or INACTIVE.",
});

export const CreateRoomTypeSchema = z
  .object({
    name,
    description,
    capacity,
    basePrice,
    status: status.default("ACTIVE"),
  })
  .strict();

export type CreateRoomTypeForm = z.input<typeof CreateRoomTypeSchema>;
export type CreateRoomType = z.output<typeof CreateRoomTypeSchema>;
