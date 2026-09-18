import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetCustomersSchema = z
  .object({
    search: z
      .string('Search must be a string')
      .trim()
      .min(1)
      .max(100)
      .optional(),
    status: z.enum(['ACTIVE', 'INACTIVE'], 'Invalid staff status').optional(),
    page: z.coerce.number('Page must be a number').int().min(1).default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int()
      .min(1)
      .max(100)
      .default(10),
  })
  .strict();

export class GetCustomersDto extends createZodDto(GetCustomersSchema) {}
