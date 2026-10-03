import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetMyBookingsSchema = z
  .object({
    search: z
      .string('Search must be a string')
      .trim()
      .max(100, 'Search must be 100 characters or less')
      .optional(),
    status: z
      .enum(
        [
          'PENDING',
          'CONFIRMED',
          'CHECKED_IN',
          'CHECKED_OUT',
          'CANCELLED',
          'NO_SHOW',
        ],
        'Invalid booking status',
      )
      .optional(),
  })
  .strict();

export class GetMyBookingsDto extends createZodDto(GetMyBookingsSchema) {}
