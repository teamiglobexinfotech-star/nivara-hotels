import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../db/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { PrismaService } from '../../db/prisma/prisma.service';
import { BrowseRoomsDto } from './dtos/browse-rooms.dto';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;
  const prismaService = {
    room: { findMany: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('returns available rooms with type images and amenities', async () => {
    prismaService.room.findMany.mockResolvedValue([
      {
        id: 'room-001',
        name: 'Corner suite',
        roomNumber: '204',
        roomType: {
          id: 'type-001',
          name: 'Deluxe',
          capacity: 2,
          basePrice: 4500,
          amenities: [
            { amenity: { id: 'amenity-001', name: 'Wi-Fi', icon: 'Wifi' } },
          ],
          images: [
            {
              image: {
                id: 'image-001',
                fileId: 'file-001',
                altText: 'Deluxe room',
              },
            },
          ],
        },
      },
    ]);

    await expect(
      service.browseRooms({
        checkIn: new Date('2026-10-10'),
        checkOut: new Date('2026-10-12'),
        guests: 2,
        roomType: 'Deluxe',
        minPrice: 3000,
        maxPrice: 5000,
        amenities: ['Wi-Fi'],
      } as BrowseRoomsDto),
    ).resolves.toEqual([
      {
        id: 'room-001',
        name: 'Corner suite',
        roomNumber: '204',
        available: true,
        roomType: {
          id: 'type-001',
          name: 'Deluxe',
          capacity: 2,
          basePrice: 4500,
          amenities: [{ id: 'amenity-001', name: 'Wi-Fi', icon: 'Wifi' }],
          images: [
            {
              id: 'image-001',
              fileId: 'file-001',
              altText: 'Deluxe room',
            },
          ],
        },
      },
    ]);
    expect(prismaService.room.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          isActive: true,
          bookingRooms: expect.objectContaining({ none: expect.any(Object) }),
        }),
      }),
    );
  });
});
