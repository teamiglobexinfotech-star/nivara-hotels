import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { ROOM_ERROR_MSG } from './room.constants';
import { CreateRoomDto } from './dtos/create-room.dto';
import {
  CreateRoomResponse,
  RoomDetailsResponse,
  RoomListItemResponse,
} from './room.types';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { ListResponse } from '../../types';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoomDto): Promise<CreateRoomResponse> {
    const roomType = await this.prismaService.roomType.findUnique({
      where: {
        id: dto.roomTypeId,
      },
      select: {
        id: true,
      },
    });

    if (!roomType) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    const existingRoom = await this.prismaService.room.findUnique({
      where: {
        roomNumber: dto.roomNumber,
      },
      select: {
        id: true,
      },
    });

    if (existingRoom) {
      throw new ConflictException(ROOM_ERROR_MSG.CONFLICT_ROOM_NUMBER);
    }

    return this.prismaService.room.create({
      data: {
        roomNumber: dto.roomNumber,
        roomTypeId: dto.roomTypeId,
        floor: dto.floor,
        description: dto.description,
        occupancyStatus: dto.occupancyStatus,
        housekeepingStatus: dto.housekeepingStatus,
        isActive: dto.isActive,
      },
      select: {
        id: true,
        roomNumber: true,
        roomTypeId: true,
        floor: true,
        description: true,
        occupancyStatus: true,
        housekeepingStatus: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getRooms(
    dto: GetRoomsDto,
  ): Promise<ListResponse<RoomListItemResponse>> {
    const {
      page,
      limit,
      search,
      isActive,
      occupancyStatus,
      housekeepingStatus,
      roomType,
    } = dto;

    const where = {
      ...(search && {
        OR: [
          {
            roomNumber: {
              contains: search,
              mode: 'insensitive' as const,
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
      ...(isActive !== undefined && {
        isActive,
      }),
      ...(occupancyStatus && {
        occupancyStatus,
      }),
      ...(housekeepingStatus && {
        housekeepingStatus,
      }),
      ...(roomType && {
        roomTypeId: roomType,
      }),
    };

    const [rooms, total] = await this.prismaService.$transaction([
      this.prismaService.room.findMany({
        where,
        select: {
          id: true,
          roomNumber: true,
          roomTypeId: true,
          floor: true,
          description: true,
          occupancyStatus: true,
          housekeepingStatus: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          roomType: {
            select: {
              id: true,
              name: true,
              description: true,
              capacity: true,
              basePrice: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      this.prismaService.room.count({
        where,
      }),
    ]);

    return {
      items: rooms,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getRoomById(id: string): Promise<RoomDetailsResponse> {
    const room = await this.prismaService.room.findUnique({
      where: { id },
      select: {
        id: true,
        roomNumber: true,
        roomTypeId: true,
        floor: true,
        description: true,
        occupancyStatus: true,
        housekeepingStatus: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        roomType: {
          select: {
            id: true,
            name: true,
            description: true,
            capacity: true,
            basePrice: true,
            status: true,
            roomTypeAmenities: {
              select: {
                amenity: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    icon: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    return room;
  }
}
