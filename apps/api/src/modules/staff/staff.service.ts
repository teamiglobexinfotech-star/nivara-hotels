import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { hashPassword } from '../../common/helpers';
import { PrismaService } from '../../db/prisma/prisma.service';
import { KpiStat, ListResponse } from '../../types';
import { AUTH_ERROR_MSG } from '../auth/auth.constants';

import { CreateStaffDto } from './dtos/create-staff.dto';
import { GetStaffDto } from './dtos/get-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { STAFF_ERROR_MSG } from './staff.constants';
import { Housekeeper, StaffDetails, StaffList } from './staff.types';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateStaffDto): Promise<{ id: string }> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ConflictException(AUTH_ERROR_MSG.CONFLICT_EMAIL);
    }

    const passwordHash = await hashPassword('secure1234');

    const staff = await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          passwordHash,
          role: 'STAFF',
        },
        select: {
          id: true,
        },
      });

      await tx.staff.create({
        data: {
          userId: user.id,
          fatherName: dto.fatherName,
          motherName: dto.motherName,
          idProofNumber: dto.idProofNumber,
          qualification: dto.qualification,
          experience: dto.experience,
          category: dto.category,
          emergencyContact: dto?.emergencyContact,
          address: dto.address,
        },
        select: {
          id: true,
        },
      });

      return { ...user, category: dto.category };
    });

    return staff;
  }

  async getAll(dto: GetStaffDto): Promise<ListResponse<StaffList[]>> {
    const { search, status, category, page, limit } = dto;
    const skip = (page - 1) * limit;

    const where = {
      role: 'STAFF' as const,
      softDeletedAt: null,
      ...(status && {
        status,
      }),
      ...(search && {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            phone: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
      ...(category && {
        staff: {
          category,
        },
      }),
    };

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          profileImage: true,
          createdAt: true,
          updatedAt: true,
          staff: {
            select: {
              category: true,
            },
          },
        },
      }),
      this.prismaService.user.count({
        where,
      }),
    ]);

    return {
      data: users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        category: user.staff?.category,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<StaffDetails> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        role: 'STAFF',
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        staff: {
          select: {
            id: true,
            fatherName: true,
            motherName: true,
            idProofNumber: true,
            qualification: true,
            experience: true,
            category: true,
            emergencyContact: true,
            address: true,
            createdAt: true,
            updatedAt: true,
            idProofImage: {
              select: {
                id: true,
                fileId: true,
                altText: true,
              },
            },
            signatureImage: {
              select: {
                id: true,
                fileId: true,
                altText: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.staff) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, dto: UpdateStaffDto): Promise<{ id: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        staff: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    const existingEmail = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
      },
    });

    if (existingEmail && existingEmail.id !== user.id) {
      throw new ConflictException(AUTH_ERROR_MSG.CONFLICT_EMAIL);
    }

    return await this.prismaService.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          isActive: dto.isActive,
        },
      });

      return tx.staff.update({
        where: { userId: user.id },
        data: {
          fatherName: dto.fatherName,
          motherName: dto.motherName,
          idProofNumber: dto.idProofNumber,
          qualification: dto.qualification,
          experience: dto.experience,
          category: dto.category,
          emergencyContact: dto.emergencyContact,
          address: dto.address,
        },
        select: {
          id: true,
        },
      });
    });
  }

  async delete(userId: string): Promise<{ id: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        softDeletedAt: new Date(),
      },
      select: { id: true },
    });
  }

  async getStats(): Promise<KpiStat[]> {
    const [totalStaff, activeStaff, inactiveStaff] =
      await this.prismaService.staff
        .aggregate({
          _count: { id: true },
          where: {
            user: {
              role: 'STAFF',
            },
          },
        })
        .then(async ({ _count }) => {
          const [active, inactive] = await Promise.all([
            this.prismaService.staff.count({
              where: {
                user: {
                  role: 'STAFF',
                  isActive: true,
                },
              },
            }),
            this.prismaService.staff.count({
              where: {
                user: {
                  role: 'STAFF',
                  isActive: false,
                },
              },
            }),
          ]);

          return [_count.id, active, inactive];
        });

    return [
      {
        id: 'total-staff',
        iconKey: 'Users',
        title: 'Total Staff',
        value: totalStaff,
        details: 'All registered staff',
      },
      {
        id: 'active-staff',
        iconKey: 'UserCheck',
        title: 'Active Staff',
        value: activeStaff,
        details: 'Currently active',
      },
      {
        id: 'inactive-staff',
        iconKey: 'UserX',
        title: 'Inactive Staff',
        value: inactiveStaff,
        details: 'Currently inactive',
      },
      {
        id: 'on-leave',
        iconKey: 'CalendarOff',
        title: 'On Leave',
        value: 0,
        details: 'Currently on leave',
      },
    ];
  }

  async getHousekeepers(search?: string): Promise<Housekeeper[]> {
    const housekeepers = await this.prismaService.staff.findMany({
      where: {
        category: 'HOUSEKEEPER',
        user: {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      select: {
        user: {
          select: {
            id: true,
            fullName: true,
            _count: {
              select: {
                housekeepingTasks: true,
              },
            },
          },
        },
      },
      orderBy: {
        user: {
          housekeepingTasks: {
            _count: 'desc',
          },
        },
      },
    });

    return housekeepers.map(({ user }) => ({
      id: user.id,
      name: user.fullName,
      totalTasks: user._count.housekeepingTasks,
    }));
  }
}
