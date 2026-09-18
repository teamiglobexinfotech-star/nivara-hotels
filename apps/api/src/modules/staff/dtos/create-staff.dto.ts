import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateStaffSchema = z
  .object({
    fullName: z
      .string('Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be 100 characters or less'),

    email: z.email('Invalid email format'),

    phone: z
      .string('Phone is required')
      .min(10, 'Phone must be at least 10 characters')
      .max(20, 'Phone must be 20 characters or less'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be 100 characters or less'),

    fatherName: z
      .string('Father name is required')
      .min(2, 'Father name must be at least 2 characters')
      .max(100, 'Father name must be 100 characters or less'),

    motherName: z
      .string('Mother name is required')
      .min(2, 'Mother name must be at least 2 characters')
      .max(100, 'Mother name must be 100 characters or less'),

    idProofImage: z
      .string('ID proof image is required')
      .min(1, 'ID proof image is required'),

    idProofNumber: z
      .string('ID proof number is required')
      .min(1, 'ID proof number is required')
      .max(50, 'ID proof number must be 50 characters or less'),

    qualification: z
      .string('Qualification is required')
      .min(1, 'Qualification is required')
      .max(100, 'Qualification must be 100 characters or less'),

    experience: z
      .string('Experience is required')
      .min(1, 'Experience is required')
      .max(100, 'Experience must be 100 characters or less'),

    category: z
      .enum(
        ['RECEPTIONIST', 'HOUSEKEEPER', 'SECURITY_GUARD', 'WAITER'],
        'Invalid staff category',
      )
      .default('HOUSEKEEPER'),

    emergencyContact: z
      .string('Emergency contact is required')
      .min(10, 'Emergency contact must be at least 10 characters')
      .max(20, 'Emergency contact must be 20 characters or less'),

    address: z
      .string('Address is required')
      .min(5, 'Address must be at least 5 characters'),

    signature: z
      .string('Signature is required')
      .min(1, 'Signature is required'),
  })
  .strict();

export class CreateStaffDto extends createZodDto(CreateStaffSchema) {}
