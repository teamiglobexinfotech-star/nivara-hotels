import { Injectable, NotFoundException } from '@nestjs/common';

import { generateRandomStr } from '../../common/helpers';
import { PrismaService } from '../../db/prisma/prisma.service';
import { KpiStat, ListResponse } from '../../types';

import { CreateReportDto } from './dtos/create-report.dto';
import { GetReportsDto } from './dtos/get-reports.dto';
import { MAINTENANCE_ERROR_MSG } from './maintenance.constants';
import type { ReportDetails, ReportList } from './maintenance.types';

@Injectable()
export class MaintenanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    reportedBy: string,
    dto: CreateReportDto,
  ): Promise<{ id: string }> {
    const room = await this.prismaService.room.findUnique({
      where: { roomNumber: dto.roomNumber.toString() },
      select: { roomNumber: true, id: true },
    });

    if (!room) {
      throw new NotFoundException(MAINTENANCE_ERROR_MSG.ROOM_NOT_FOUND);
    }

    const reportReference = generateRandomStr(8);
    const report = await this.prismaService.maintenanceReport.create({
      data: {
        category: dto.category,
        priority: dto.priority,
        description: dto.description,
        roomId: room.id,
        reportedBy,
        reportReference,
        reportedAt: new Date(),
      },
      select: { id: true },
    });

    return report;
  }

  async getAll(dto: GetReportsDto): Promise<ListResponse<ReportList[]>> {
    const { page, limit, search, category, priority } = dto;

    const where = {
      ...(search && {
        OR: [
          {
            room: {
              roomNumber: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
      ...(category && {
        category,
      }),
      ...(priority && {
        priority,
      }),
    };

    const [reports, total] = await this.prismaService.$transaction([
      this.prismaService.maintenanceReport.findMany({
        where,
        select: {
          id: true,
          reportReference: true,
          room: {
            select: {
              id: true,
              name: true,
              roomNumber: true,
            },
          },
          category: true,
          priority: true,
          reporter: {
            select: {
              id: true,
              fullName: true,
            },
          },
          assignee: {
            select: {
              id: true,
              fullName: true,
            },
          },
          reportedAt: true,
          status: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      this.prismaService.maintenanceReport.count({
        where,
      }),
    ]);

    return {
      data: reports,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<ReportDetails> {
    const report = await this.prismaService.maintenanceReport.findUnique({
      where: { id },
      select: {
        id: true,
        reportReference: true,
        room: {
          select: {
            id: true,
            name: true,
            roomNumber: true,
          },
        },
        category: true,
        priority: true,
        reporter: {
          select: {
            id: true,
            fullName: true,
          },
        },
        assignee: {
          select: {
            id: true,
            fullName: true,
          },
        },
        reportedAt: true,
        status: true,
        description: true,
        startedAt: true,
        completedAt: true,
        resolvedAt: true,
      },
    });

    if (!report) {
      throw new NotFoundException(MAINTENANCE_ERROR_MSG.NOT_FOUND);
    }
    return report;
  }

  async getStats(): Promise<KpiStat[]> {
    const [totalReports, inProgressReports, completedReports, resolvedReports] =
      await Promise.all([
        this.prismaService.maintenanceReport.count(),
        this.prismaService.maintenanceReport.count({
          where: {
            status: 'IN_PROGRESS',
          },
        }),
        this.prismaService.maintenanceReport.count({
          where: {
            status: 'COMPLETED',
          },
        }),
        this.prismaService.maintenanceReport.count({
          where: {
            status: 'RESOLVED',
          },
        }),
      ]);

    return [
      {
        id: 'total-reports',
        iconKey: 'ListTodo',
        title: 'Total Reports',
        value: totalReports,
        details: 'All registered reports',
      },
      {
        id: 'in-progress-reports',
        iconKey: 'TriangleAlert',
        title: 'In Progress Reports',
        value: inProgressReports,
        details: 'Currently in progress',
      },
      {
        id: 'completed-reports',
        iconKey: 'ListChecks',
        title: 'Completed Reports',
        value: completedReports,
        details: 'Currently completed',
      },
      {
        id: 'resolved-reports',
        iconKey: 'Check',
        title: 'Resolved Reports',
        value: resolvedReports,
        details: 'Resolved reports',
      },
    ];
  }

  async delete(id: string): Promise<{ id: string }> {
    const room = await this.prismaService.maintenanceReport.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!room) {
      throw new NotFoundException(MAINTENANCE_ERROR_MSG.NOT_FOUND);
    }

    return await this.prismaService.maintenanceReport.delete({
      where: { id },
    });
  }
}
