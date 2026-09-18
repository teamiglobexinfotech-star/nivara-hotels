import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateAmenitySchema = z
  .object({
    name: z
      .string('Amenity name is required')
      .min(2, 'Amenity name must be at least 2 characters')
      .max(100, 'Amenity name must be 100 characters or less'),
    description: z
      .string('Description must be a string')
      .max(500, 'Description must be 500 characters or less')
      .optional(),
    icon: z
      .string('Icon must be a string')
      .max(255, 'Icon must be 255 characters or less')
      .optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  })
  .strict();

export class CreateAmenityDto extends createZodDto(CreateAmenitySchema) {}
