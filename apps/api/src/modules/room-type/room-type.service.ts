import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import {
  CreateRoomTypeResponse,
  RoomTypeListItemResponse,
  UpdateRoomTypeResponse,
} from './room-type.types';
import { ROOM_TYPE_ERROR_MSG } from './room-type.constants';
import { CreateRoomTypeDto } from './dtos/create-room-type.dto';
import { UpdateRoomTypeDto } from './dtos/update-room-type.dto';

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

  async getAll(): Promise<RoomTypeListItemResponse[]> {
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

  async update(
    id: string,
    dto: UpdateRoomTypeDto,
  ): Promise<UpdateRoomTypeResponse> {
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

    return this.prismaService.roomType.update({
      where: { id },
      data: { ...dto },
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        basePrice: true,
        status: true,
      },
    });
  }

  async delete(roomId: string): Promise<void> {
    const room = await this.prismaService.roomType.findUnique({
      where: { id: roomId },
      select: { id: true },
    });

    if (!room) {
      throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_NOT_FOUND);
    }

    await this.prismaService.roomType.delete({
      where: { id: roomId },
    });
  }
}
