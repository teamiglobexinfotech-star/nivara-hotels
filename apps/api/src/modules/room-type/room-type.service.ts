import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';

import { CreateRoomTypeDto } from './dtos/create-room-type.dto';
import { UpdateRoomTypeDto } from './dtos/update-room-type.dto';
import { ROOM_TYPE_ERROR_MSG } from './room-type.constants';
import { RoomType, RoomTypeList } from './room-type.types';

@Injectable()
export class RoomTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoomTypeDto): Promise<RoomType> {
    const existingRoomType = await this.prismaService.roomType.findFirst({
      where: {
        name: {
          equals: dto.name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
      },
    });

    if (existingRoomType) {
      throw new ConflictException(ROOM_TYPE_ERROR_MSG.CONFLICT_NAME);
    }

    return await this.prismaService.roomType.create({
      data: {
        name: dto.name,
        description: dto.description,
        capacity: dto.capacity,
        basePrice: dto.basePrice,
        isActive: dto.isActive,
      },
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        basePrice: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAll(): Promise<RoomTypeList[]> {
    return await this.prismaService.roomType.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        basePrice: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, dto: UpdateRoomTypeDto): Promise<{ id: string }> {
    const roomType = await this.prismaService.roomType.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!roomType) {
      throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_NOT_FOUND);
    }

    if (dto.name && dto.name !== roomType.name) {
      const existingRoomType = await this.prismaService.roomType.findFirst({
        where: {
          name: dto.name,
          NOT: { id },
        },
        select: { id: true },
      });

      if (existingRoomType) {
        throw new ConflictException(ROOM_TYPE_ERROR_MSG.CONFLICT_NAME);
      }
    }

    return await this.prismaService.roomType.update({
      where: { id },
      data: { ...dto },
      select: {
        id: true,
      },
    });
  }

  async delete(roomId: string): Promise<{ id: string }> {
    const room = await this.prismaService.roomType.findUnique({
      where: { id: roomId },
      select: { id: true },
    });

    if (!room) {
      throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_NOT_FOUND);
    }

    return await this.prismaService.roomType.delete({
      where: { id: roomId },
      select: { id: true },
    });
  }
}
