import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { hashPassword } from '../../common/helpers';
import { AUTH_ERROR_MSG } from '../auth/auth.constants';
import {
  CreateStaffResponse,
  StaffDetailsResponse,
  StaffListItem,
} from './staff.types';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { GetStaffDto } from './dtos/get-staff.dto';
import { ListResponse } from '../../types';
import { STAFF_ERROR_MSG } from './staff.constants';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStaff(dto: CreateStaffDto): Promise<CreateStaffResponse> {
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

    const passwordHash = await hashPassword(dto.password);

    const staff = await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          passwordHash,
          role: 'STAFF',
          status: 'ACTIVE',
          profileImage: '',
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          role: true,
          status: true,
        },
      });

      const staff = await tx.staff.create({
        data: {
          userId: user.id,
          fatherName: dto.fatherName,
          motherName: dto.motherName,
          idProofImage: dto.idProofImage,
          idProofNumber: dto.idProofNumber,
          qualification: dto.qualification,
          experience: dto.experience,
          category: dto.category,
          emergencyContact: dto?.emergencyContact,
          address: dto.address,
          signature: dto.signature,
          status: 'ACTIVE',
        },
        select: {
          category: true,
        },
      });

      return {
        ...user,
        category: staff.category,
      };
    });

    return staff;
  }

  async getStaff(dto: GetStaffDto): Promise<ListResponse<StaffListItem>> {
    const { search, status, category, page, limit } = dto;
    const skip = (page - 1) * limit;

    const where = {
      role: 'STAFF' as const,
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
          status: true,
          createdAt: true,
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
      items: users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        status: user.status,
        category: user.staff!.category,
        createdAt: user.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getStaffById(id: string): Promise<StaffDetailsResponse> {
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
        profileImage: true,
        role: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        staff: {
          select: {
            id: true,
            fatherName: true,
            motherName: true,
            idProofImage: true,
            idProofNumber: true,
            qualification: true,
            experience: true,
            category: true,
            emergencyContact: true,
            address: true,
            signature: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!user || !user.staff) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    return user;
  }
}
