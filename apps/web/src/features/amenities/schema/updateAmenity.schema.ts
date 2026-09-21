import { z } from "zod";

export const updateAmenitySchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    description: z.string().min(1, "Description is required."),
    iconKey: z.string().min(1, "Icon key is required."),
    isActive: z.boolean(),
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export type UpdateAmenity = z.infer<typeof updateAmenitySchema>;
