import { Injectable } from '@nestjs/common';

import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}
}
