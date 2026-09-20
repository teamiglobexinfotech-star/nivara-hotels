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
  RoomStatsResponse,
  UpdateRoomResponse,
} from './room.types';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { ListResponse } from '../../types';
import { UpdateRoomDto } from './dtos/update-room.dto';

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

  async getAll(dto: GetRoomsDto): Promise<ListResponse<RoomListItemResponse>> {
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

  async getById(id: string): Promise<RoomDetailsResponse> {
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

  async update(id: string, dto: UpdateRoomDto): Promise<UpdateRoomResponse> {
    const room = await this.prismaService.room.findUnique({
      where: { id },
      select: {
        id: true,
        roomNumber: true,
      },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    if (dto.roomNumber && dto.roomNumber !== room.roomNumber) {
      const existingRoom = await this.prismaService.room.findUnique({
        where: { roomNumber: dto.roomNumber },
        select: { id: true },
      });

      if (existingRoom) {
        throw new ConflictException(ROOM_ERROR_MSG.CONFLICT_ROOM_NUMBER);
      }
    }

    if (dto.roomTypeId) {
      const roomType = await this.prismaService.roomType.findUnique({
        where: { id: dto.roomTypeId },
        select: { id: true },
      });

      if (!roomType) {
        throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
      }
    }

    return this.prismaService.room.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        roomNumber: true,
        roomTypeId: true,
        floor: true,
        description: true,
        occupancyStatus: true,
        housekeepingStatus: true,
        isActive: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const room = await this.prismaService.roomType.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    await this.prismaService.room.delete({
      where: { id },
    });
  }

  async getStats(): Promise<RoomStatsResponse> {
    const [totalRoom, available, occupied, cleaning, serviceRequired] =
      await Promise.all([
        this.prismaService.room.count(),

        this.prismaService.room.count({
          where: {
            occupancyStatus: 'VACANT',
            isActive: true,
            housekeepingStatus: 'CLEAN',
          },
        }),

        this.prismaService.room.count({
          where: {
            occupancyStatus: 'OCCUPIED',
          },
        }),

        this.prismaService.room.count({
          where: {
            housekeepingStatus: 'CLEANING',
          },
        }),

        this.prismaService.room.count({
          where: {
            housekeepingStatus: 'DIRTY',
          },
        }),
      ]);

    return [
      {
        id: 'total-room',
        icon: 'BedDouble',
        title: 'Total Rooms',
        value: totalRoom,
        detail: 'All registered rooms',
      },
      {
        id: 'available',
        icon: 'DoorOpen',
        title: 'Available',
        value: available,
        detail: 'Ready for new bookings',
      },
      {
        id: 'occupied',
        icon: 'Users',
        title: 'Occupied',
        value: occupied,
        detail: 'Currently occupied',
      },
      {
        id: 'housekeeping',
        icon: 'Sparkles',
        title: 'Housekeeping',
        value: cleaning + serviceRequired,
        detail: `${cleaning} cleaning, ${serviceRequired} service required`,
      },
    ];
  }
}
