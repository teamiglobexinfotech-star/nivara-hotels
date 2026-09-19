import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateCustomerSchema = z
  .object({
    fullName: z
      .string('Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be 100 characters or less')
      .optional(),
    email: z.email('Invalid email format').optional(),
    phone: z
      .string('Phone number is required')
      .min(7, 'Phone number must be at least 7 characters')
      .max(20, 'Phone number must be 20 characters or less')
      .optional(),
    idProofNumber: z
      .string('ID proof number is required')
      .max(100, 'ID proof number must be 100 characters or less')
      .optional(),
    address: z
      .string('Address is required')
      .max(500, 'Address must be 500 characters or less')
      .optional(),
  })
  .strict();

export class UpdateCustomerDto extends createZodDto(UpdateCustomerSchema) {}
