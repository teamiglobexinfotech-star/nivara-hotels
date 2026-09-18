import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateRoomTypeSchema = z
  .object({
    name: z
      .string('Room type name is required')
      .min(2, 'Room type name must be at least 2 characters')
      .max(100, 'Room type name must be 100 characters or less'),
    description: z
      .string('Description must be a string')
      .max(500, 'Description must be 500 characters or less')
      .optional(),
    capacity: z
      .number('Capacity is required')
      .int('Capacity must be a whole number')
      .min(1, 'Capacity must be at least 1'),
    basePrice: z
      .number('Base price is required')
      .positive('Base price must be greater than 0'),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  })
  .strict();

export class CreateRoomTypeDto extends createZodDto(CreateRoomTypeSchema) {}
