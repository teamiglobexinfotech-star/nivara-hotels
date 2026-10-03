import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';
import { BookingStatus, KpiStat, ListResponse } from '../../types';

import { BrowseRoomsDto } from './dtos/browse-rooms.dto';
import { CreateRoomDto } from './dtos/create-room.dto';
import { GetRoomsDto } from './dtos/get-rooms.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { ROOM_ERROR_MSG } from './room.constants';
import {
  BrowseRoomItem,
  Room,
  RoomAvailableItem,
  RoomDetails,
  RoomList,
} from './room.types';

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
        roomNumber: dto.roomNumber.toString(),
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
        name: dto.name,
        roomNumber: dto.roomNumber.toString(),
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
          roomType: {
            select: {
              id: true,
              name: true,
            },
          },
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
                id: true,
                icon: true,
                name: true,
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

    if (dto.roomNumber && dto.roomNumber.toString() !== room.roomNumber) {
      const existingRoom = await this.prismaService.room.findUnique({
        where: { roomNumber: dto.roomNumber.toString() },
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
      data: {
        ...dto,
        roomNumber: undefined,
        ...(dto.roomNumber && { roomNumber: dto.roomNumber.toString() }),
      },
      select: {
        id: true,
      },
    });
  }

  async delete(id: string): Promise<{ id: string }> {
    const room = await this.prismaService.room.findUnique({
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

  async getStats(): Promise<KpiStat[]> {
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
        description: 'All registered rooms',
      },
      {
        id: 'available',
        icon: 'DoorOpen',
        title: 'Available',
        value: available,
        description: 'Ready for new bookings',
      },
      {
        id: 'occupied',
        icon: 'Users',
        title: 'Occupied',
        value: occupied,
        description: 'Currently occupied',
      },
      {
        id: 'housekeeping',
        icon: 'Sparkles',
        title: 'Housekeeping',
        value: cleaning + serviceRequired,
        description: `${cleaning} cleaning, ${serviceRequired} service required`,
      },
    ];
  }

  async getAvailableRooms(
    checkIn: Date,
    checkOut: Date,
    capacity: number,
  ): Promise<RoomAvailableItem[]> {
    return this.prismaService.room.findMany({
      where: {
        isActive: true,
        roomType: {
          isActive: true,
          capacity: {
            gte: capacity,
          },
        },
        bookingRooms: {
          none: {
            booking: {
              status: {
                notIn: [BookingStatus.CANCELLED, BookingStatus.NO_SHOW],
              },
              checkInDate: {
                lt: checkOut,
              },
              checkOutDate: {
                gt: checkIn,
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        roomNumber: true,
        roomType: {
          select: {
            id: true,
            name: true,
            capacity: true,
            basePrice: true,
          },
        },
      },
      orderBy: {
        roomType: {
          capacity: 'asc',
        },
      },
    });
  }

  async browseRooms(query: BrowseRoomsDto): Promise<BrowseRoomItem[]> {
    const {
      search,
      checkIn,
      checkOut,
      guests,
      roomType,
      minPrice,
      maxPrice,
      amenities,
    } = query;
    const rooms = await this.prismaService.room.findMany({
      where: {
        isActive: true,
        roomType: {
          isActive: true,
          capacity: { gte: guests },
          ...(roomType && {
            OR: [
              { id: roomType },
              { name: { contains: roomType, mode: 'insensitive' as const } },
            ],
          }),
          ...(minPrice !== undefined || maxPrice !== undefined
            ? {
                basePrice: {
                  ...(minPrice !== undefined && { gte: minPrice }),
                  ...(maxPrice !== undefined && { lte: maxPrice }),
                },
              }
            : {}),
          ...(amenities?.length && {
            AND: amenities.map((name) => ({
              amenities: { some: { name } },
            })),
          }),
        },
        ...(search && {
          OR: [
            {
              roomNumber: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              name: { contains: search, mode: 'insensitive' as const },
            },
            {
              roomType: {
                name: { contains: search, mode: 'insensitive' as const },
              },
            },
          ],
        }),
        bookingRooms: {
          none: {
            booking: {
              status: {
                notIn: [BookingStatus.CANCELLED, BookingStatus.NO_SHOW],
              },
              checkInDate: { lt: checkOut },
              checkOutDate: { gt: checkIn },
            },
          },
        },
      },
      orderBy: { roomType: { basePrice: 'asc' } },
      take: 20,
      select: {
        id: true,
        name: true,
        roomNumber: true,
        roomType: {
          select: {
            id: true,
            name: true,
            capacity: true,
            basePrice: true,
            amenities: {
              select: { id: true, name: true, icon: true },
            },
            images: {
              select: {
                id: true,
                url: true,
                altText: true,
              },
            },
          },
        },
      },
    });

    return rooms.map((room) => ({
      id: room.id,
      name: room.name,
      roomNumber: room.roomNumber,
      available: true,
      roomType: {
        id: room.roomType.id,
        name: room.roomType.name,
        capacity: room.roomType.capacity,
        basePrice: room.roomType.basePrice,
        amenities: room.roomType.amenities,
        images: room.roomType.images,
      },
    }));
  }
}
