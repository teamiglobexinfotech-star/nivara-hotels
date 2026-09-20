import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateAmenitySchema = z
  .object({
    name: z
      .string('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be 100 characters or less')
      .optional(),

    description: z
      .string('Description must be a string')
      .max(1000, 'Description must be 1000 characters or less')
      .nullable()
      .optional(),

    icon: z
      .string('Icon must be a string')
      .max(100, 'Icon must be 100 characters or less')
      .nullable()
      .optional(),

    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  })
  .strict();

export class UpdateAmenityDto extends createZodDto(UpdateAmenitySchema) {}
