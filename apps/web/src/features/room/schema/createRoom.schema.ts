import { z } from "zod";

export const CreateRoomSchema = z
  .object({
    roomNumber: z
      .string("Room number is required")
      .min(1, "Room number is required")
      .max(50, "Room number must be 50 characters or less"),

    roomTypeId: z.cuid("Invalid room type ID"),

    floor: z.coerce
      .number("Floor must be a valid number.")
      .nonnegative("Floor cannot be negative."),

    description: z
      .string("Description must be a string")
      .max(500, "Description must be 500 characters or less")
      .optional(),

    occupancyStatus: z
      .enum(["VACANT", "RESERVED", "OCCUPIED", "OUT_OF_ORDER"])
      .default("VACANT"),

    housekeepingStatus: z.enum(["CLEAN", "DIRTY", "CLEANING"]).default("CLEAN"),

    isActive: z.boolean("Active status is required").default(true),
  })
  .strict();

export type CreateRoom = z.infer<typeof CreateRoomSchema>;
