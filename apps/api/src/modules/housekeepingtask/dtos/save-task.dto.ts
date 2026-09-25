import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SaveHousekeepingTaskSchema = z
  .object({
    maintenanceId: z.string().cuid('Invalid maintenance ID'),
    housekeeperId: z.string().cuid('Invalid housekeeper ID'),
  })
  .strict();

export class SaveHousekeepingTaskDto extends createZodDto(
  SaveHousekeepingTaskSchema,
) {}
