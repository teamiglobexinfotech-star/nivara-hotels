import { Module } from '@nestjs/common';

import { PrismaModule } from '../../db/prisma/prisma.module';

import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';

@Module({
  imports: [PrismaModule],
  controllers: [AmenityController],
  providers: [AmenityService],
})
export class AmenityModule {}
