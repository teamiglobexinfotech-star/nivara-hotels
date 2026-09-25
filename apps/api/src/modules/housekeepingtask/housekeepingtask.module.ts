import { Module } from '@nestjs/common';

import { PrismaModule } from '../../db/prisma/prisma.module';

import { HousekeepingtaskController } from './housekeepingtask.controller';
import { HousekeepingtaskService } from './housekeepingtask.service';

@Module({
  imports: [PrismaModule],
  controllers: [HousekeepingtaskController],
  providers: [HousekeepingtaskService],
})
export class HousekeepingtaskModule {}
