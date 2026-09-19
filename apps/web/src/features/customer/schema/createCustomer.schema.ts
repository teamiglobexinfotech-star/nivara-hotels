import z from "zod";

const requiredString = (message: string) => z.string().trim().min(1, message);

export const CreateCustomerSchema = z
  .object({
    fullName: requiredString("Full name is required").max(
      100,
      "Full name must be 100 characters or less"
    ),
    phone: requiredString("Phone number is required"),
    email: z.email("Enter a valid email address"),
    address: requiredString("Address is required").max(
      500,
      "Address must be 500 characters or less"
    ),
    idProofNumber: requiredString("ID proof number is required"),
  })
  .strict();

export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;
