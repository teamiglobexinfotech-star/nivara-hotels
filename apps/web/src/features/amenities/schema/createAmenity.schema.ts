import { z } from "zod";

export const createAmenitySchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    description: z.string().min(1, "Description is required."),
    iconKey: z.string().min(1, "Icon key is required."),
    isActive: z.boolean(),
  })
  .strict();

export type CreateAmenity = z.infer<typeof createAmenitySchema>;
