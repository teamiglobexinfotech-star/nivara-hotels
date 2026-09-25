import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';

import { SaveHousekeepingTaskDto } from './dtos/save-task.dto';
import { HousekeepingTask } from './housekeepingtask.types';

@Injectable()
export class HousekeepingtaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveTask(dto: SaveHousekeepingTaskDto): Promise<HousekeepingTask> {
    const [maintenance, housekeeper] = await Promise.all([
      this.prismaService.maintenanceReport.findUnique({
        where: { id: dto.maintenanceId },
        select: { id: true, roomId: true },
      }),
      this.prismaService.user.findFirst({
        where: {
          id: dto.housekeeperId,
          isActive: true,
          role: 'STAFF',
          staff: {
            category: 'HOUSEKEEPER',
          },
        },
        select: { id: true },
      }),
    ]);

    if (!maintenance) {
      throw new NotFoundException('Maintenance task not found');
    }

    if (!housekeeper) {
      throw new NotFoundException('Housekeeper not found');
    }

    const task = await this.prismaService.housekeepingTask.create({
      data: {
        taskType: 'CLEANING',
        status: 'PENDING',
        scheduledDate: new Date(),
        assignedTo: housekeeper.id,
        roomId: maintenance.roomId,
      },
      select: { id: true },
    });

    return {
      id: task.id,
      maintenanceId: maintenance.id,
      housekeeperId: housekeeper.id,
    };
  }
}
