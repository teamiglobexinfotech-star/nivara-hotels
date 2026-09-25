import { Test, TestingModule } from '@nestjs/testing';
import { HousekeepingtaskService } from './housekeepingtask.service';

describe('HousekeepingtaskService', () => {
  let service: HousekeepingtaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousekeepingtaskService],
    }).compile();

    service = module.get<HousekeepingtaskService>(HousekeepingtaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
