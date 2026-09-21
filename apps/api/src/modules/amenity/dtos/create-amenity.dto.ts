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
    iconKey: z
      .string('Icon must be a string')
      .max(255, 'Icon must be 255 characters or less')
      .optional(),
    isActive: z.boolean('IsActive must be a boolean').default(true).optional(),
  })
  .strict();

export class CreateAmenityDto extends createZodDto(CreateAmenitySchema) {}
