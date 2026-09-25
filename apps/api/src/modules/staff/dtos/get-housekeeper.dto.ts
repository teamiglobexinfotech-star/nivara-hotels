import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetHousekeeperSchema = z.object({
  search: z.string().trim().optional(),
});

export class GetHousekeeperDto extends createZodDto(GetHousekeeperSchema) {}
