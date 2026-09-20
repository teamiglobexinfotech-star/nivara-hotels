import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateRoomSchema = z
  .object({
    roomNumber: z
      .string('Room number is required')
      .min(1, 'Room number is required')
      .max(50, 'Room number must be 50 characters or less')
      .optional(),

    roomTypeId: z
      .string('Room type ID is required')
      .min(1, 'Room type ID is required')
      .optional(),

    floor: z
      .number('Floor must be a number')
      .int('Floor must be a whole number')
      .min(0, 'Floor cannot be negative')
      .optional(),

    description: z
      .string('Description must be a string')
      .max(1000, 'Description must be 1000 characters or less')
      .nullable()
      .optional(),

    occupancyStatus: z
      .enum(['VACANT', 'RESERVED', 'OCCUPIED', 'OUT_OF_ORDER'])
      .optional(),

    housekeepingStatus: z.enum(['CLEAN', 'DIRTY', 'CLEANING']).optional(),

    isActive: z.boolean('Active status must be true or false').optional(),
  })
  .strict();

export class UpdateRoomDto extends createZodDto(UpdateRoomSchema) {}
