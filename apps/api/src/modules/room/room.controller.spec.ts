import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../common/guards', () => ({
  AuthGuard: class AuthGuard {},
  RoleGuard: class RoleGuard {},
}));

import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('RoomController', () => {
  let controller: RoomController;
  const roomService = { browseRooms: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [{ provide: RoomService, useValue: roomService }],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('returns browse results in the standard API response', async () => {
    const data = [{ id: 'room-001', roomNumber: '204', available: true }];
    roomService.browseRooms.mockResolvedValue(data);

    await expect(controller.browseRooms({} as never)).resolves.toEqual({
      data,
    });
  });
});
