import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateRoomTypeSchema = z
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

    capacity: z
      .number('Capacity must be a number')
      .int('Capacity must be a whole number')
      .min(1, 'Capacity must be at least 1')
      .max(100, 'Capacity must be 100 or less')
      .optional(),

    basePrice: z
      .number('Base price must be a number')
      .finite('Base price must be a valid number')
      .min(0, 'Base price cannot be negative')
      .optional(),

    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  })
  .strict();

export class UpdateRoomTypeDto extends createZodDto(UpdateRoomTypeSchema) {}
