import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';
import { ListResponse } from '../../types';

import { CreateRoomDto } from './dtos/create-room.dto';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { ROOM_ERROR_MSG } from './room.constants';
import { Room, RoomDetails, RoomList, RoomStat } from './room.types';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoomDto): Promise<Room> {
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

    return await this.prismaService.room.create({
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
        name: true,
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

  async getAll(dto: GetRoomsDto): Promise<ListResponse<RoomList[]>> {
    const {
      page,
      limit,
      search,
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
            name: {
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
          name: true,
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
      data: rooms,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<RoomDetails> {
    const room = await this.prismaService.room.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
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
            isActive: true,
            amenities: {
              select: {
                amenity: {
                  select: {
                    id: true,
                    iconKey: true,
                    name: true,
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

  async update(id: string, dto: UpdateRoomDto): Promise<{ id: string }> {
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

    return await this.prismaService.room.update({
      where: { id },
      data: { ...dto },
      select: {
        id: true,
      },
    });
  }

  async delete(id: string): Promise<{ id: string }> {
    const room = await this.prismaService.roomType.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    return await this.prismaService.room.delete({
      where: { id },
      select: { id: true },
    });
  }

  async getStats(): Promise<RoomStat[]> {
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
        iconKey: 'BedDouble',
        title: 'Total Rooms',
        value: totalRoom,
        details: 'All registered rooms',
      },
      {
        id: 'available',
        iconKey: 'DoorOpen',
        title: 'Available',
        value: available,
        details: 'Ready for new bookings',
      },
      {
        id: 'occupied',
        iconKey: 'Users',
        title: 'Occupied',
        value: occupied,
        details: 'Currently occupied',
      },
      {
        id: 'housekeeping',
        iconKey: 'Sparkles',
        title: 'Housekeeping',
        value: cleaning + serviceRequired,
        details: `${cleaning} cleaning, ${serviceRequired} service required`,
      },
    ];
  }
}
