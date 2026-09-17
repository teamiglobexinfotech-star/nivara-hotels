import z from "zod";

const requiredString = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} is required`);

export const CreateStaffSchema = z
  .object({
    fullName: requiredString("Full name"),
    email: z.email("Please enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    fatherName: requiredString("Father name"),
    motherName: requiredString("Mother name"),
    idProofNumber: requiredString("ID proof number"),
    qualification: requiredString("Qualification"),
    experience: requiredString("Experience"),
    category: requiredString("Category"),
    emergencyContact: z
      .string()
      .trim()
      .min(1, "Emergency contact is required")
      .regex(/^[0-9]{10}$/, "Emergency contact must be exactly 10 digits"),
    address: requiredString("Address"),
  })
  .strict();

export type CreateStaff = z.infer<typeof CreateStaffSchema>;
