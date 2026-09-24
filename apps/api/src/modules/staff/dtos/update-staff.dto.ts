import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const requiredString = (fieldName: string) =>
  z
    .string(`${fieldName} must be text`)
    .trim()
    .min(1, `${fieldName} is required`);

export const UpdateStaffSchema = z
  .object({
    fullName: requiredString('Full name').optional(),

    email: z.email('Please enter a valid email address').optional(),

    phone: z
      .string('Phone number must be text')
      .trim()
      .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .optional(),

    fatherName: requiredString('Father name').optional(),

    motherName: requiredString('Mother name').optional(),

    idProofNumber: requiredString('ID proof number').optional(),

    qualification: requiredString('Qualification').optional(),

    experience: requiredString('Experience').optional(),

    category: z
      .enum(
        ['RECEPTIONIST', 'HOUSEKEEPER', 'SECURITY_GUARD', 'WAITER'],
        'Invalid staff category',
      )
      .optional(),

    emergencyContact: z
      .string('Emergency contact must be text')
      .trim()
      .regex(/^[0-9]{10}$/, 'Emergency contact must be exactly 10 digits')
      .optional(),

    address: requiredString('Address').optional(),

    isActive: z.boolean('Active status must be true or false').optional(),
  })
  .strict();

export class UpdateStaffDto extends createZodDto(UpdateStaffSchema) {}
