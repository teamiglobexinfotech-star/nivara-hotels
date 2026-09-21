import { Module } from '@nestjs/common';

import { PrismaModule } from '../db/prisma/prisma.module';

import { SeedService } from './seed.service';

@Module({
  imports: [PrismaModule],
  providers: [SeedService],
})
export class SeedModule {}
