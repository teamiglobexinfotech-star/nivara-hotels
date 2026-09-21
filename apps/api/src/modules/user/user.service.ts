import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';

import { User } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(userId: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        profileImage: {
          select: {
            id: true,
            fileId: true,
            altText: true,
          },
        },
        staff: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      ...(user.staff?.category && {
        category: user.staff.category,
      }),
      profileImage: user.profileImage,
    };
  }
}
