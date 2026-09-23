import z from "zod";

const requiredString = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} is required`);

export const UpdateStaffSchema = z
  .object({
    fullName: requiredString("Full name").optional(),
    email: z.email("Please enter a valid email address").optional(),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .optional(),
    fatherName: requiredString("Father name").optional(),
    motherName: requiredString("Mother name").optional(),
    idProofNumber: requiredString("ID proof number").optional(),
    qualification: requiredString("Qualification").optional(),
    experience: requiredString("Experience").optional(),
    category: requiredString("Category").optional(),
    emergencyContact: z
      .string()
      .trim()
      .min(1, "Emergency contact is required")
      .regex(/^[0-9]{10}$/, "Emergency contact must be exactly 10 digits")
      .optional(),
    address: requiredString("Address").optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export type UpdateStaff = z.infer<typeof UpdateStaffSchema>;
