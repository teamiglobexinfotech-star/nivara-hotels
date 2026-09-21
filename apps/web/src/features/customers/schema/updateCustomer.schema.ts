import z from "zod";

export const UpdateCustomerSchema = z
  .object({
    fullName: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    email: z.email("Enter a valid email address").optional(),
    address: z.string().trim().optional(),
    idProofNumber: z.string().trim().optional(),
  })
  .strict();

export type UpdateCustomer = z.infer<typeof UpdateCustomerSchema>;
