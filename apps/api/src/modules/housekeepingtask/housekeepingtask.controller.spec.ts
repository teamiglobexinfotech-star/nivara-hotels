import { Test, TestingModule } from '@nestjs/testing';
import { HousekeepingtaskController } from './housekeepingtask.controller';
import { HousekeepingtaskService } from './housekeepingtask.service';

describe('HousekeepingtaskController', () => {
  let controller: HousekeepingtaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousekeepingtaskController],
      providers: [HousekeepingtaskService],
    }).compile();

    controller = module.get<HousekeepingtaskController>(HousekeepingtaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
