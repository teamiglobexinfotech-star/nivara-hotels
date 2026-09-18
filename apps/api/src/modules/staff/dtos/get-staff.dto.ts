import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetStaffSchema = z
  .object({
    search: z
      .string()
      .max(100, 'Search must be 100 characters or less')
      .optional(),

    status: z.enum(['ACTIVE', 'INACTIVE'], 'Invalid staff status').optional(),

    category: z
      .enum(
        ['RECEPTIONIST', 'HOUSEKEEPER', 'SECURITY_GUARD', 'WAITER'],
        'Invalid staff category',
      )
      .optional(),

    page: z.coerce
      .number()
      .int('Page must be an integer')
      .min(1, 'Page must be at least 1')
      .default(1),

    limit: z.coerce
      .number()
      .int('Limit must be an integer')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit must be 100 or less')
      .default(10),
  })
  .strict();

export class GetStaffDto extends createZodDto(GetStaffSchema) {}
