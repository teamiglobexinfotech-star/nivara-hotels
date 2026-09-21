import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetCustomersSchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    isActive: z.boolean('IsActive must be a boolean').optional(),
    page: z.coerce.number('Page must be a number').int().default(1),
    limit: z.coerce.number('Limit must be a number').int().max(100).default(10),
  })
  .strict();

export class GetCustomersDto extends createZodDto(GetCustomersSchema) {}
