import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SearchCustomersSchema = z
  .object({
    q: z
      .string('Search query is required')
      .trim()
      .optional(),
  })
  .strict();

export class SearchCustomersDto extends createZodDto(SearchCustomersSchema) {}
