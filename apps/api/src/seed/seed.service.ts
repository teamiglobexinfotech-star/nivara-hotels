import { Injectable } from '@nestjs/common';

import { hashPassword } from '../common/helpers';
import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {
    (async () => {
      // await this.seed();
    })();
  }
  async seed() {
    await this.prismaService.user.create({
      data: {
        email: 'admin@duck.com',
        fullName: 'Admin',
        phone: '+919876543210',
        passwordHash: await hashPassword('secure1234'),
        role: 'ADMIN',
      },
    });
  }
}
