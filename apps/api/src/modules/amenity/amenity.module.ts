import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';
import { PrismaModule } from '../../db/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AmenityController],
  providers: [AmenityService],
})
export class AmenityModule {}
