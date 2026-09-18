import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import {
  CreateRoomTypeResponse,
  RoomTypeListItemResponse,
} from './room-type.types';
import { ROOM_TYPE_ERROR_MSG } from './room-type.constants';
import { CreateRoomTypeDto } from './dtos/create-room-type.dto';

@Injectable()
export class RoomTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoomTypeDto): Promise<CreateRoomTypeResponse> {
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

    return this.prismaService.roomType.create({
      data: {
        name: dto.name,
        description: dto.description,
        capacity: dto.capacity,
        basePrice: dto.basePrice,
        status: dto.status,
      },
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        basePrice: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async getRoomTypes(): Promise<RoomTypeListItemResponse[]> {
    return this.prismaService.roomType.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        basePrice: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
