import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Project } from 'node-appwrite';

import { PrismaModule } from './db/prisma/prisma.module';
import { AmenityModule } from './modules/amenity/amenity.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { RoomModule } from './modules/room/room.module';
import { RoomTypeModule } from './modules/room-type/room-type.module';
import { StaffModule } from './modules/staff/staff.module';
import { UserModule } from './modules/user/user.module';
import { SeedModule } from './seed/seed.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { client, env } from './config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    PrismaModule,
    AuthModule,
    SeedModule,
    StaffModule,
    CustomerModule,
    AmenityModule,
    RoomModule,
    RoomTypeModule,
    UserModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: Project, useFactory: () => new Project(client) },
  ],
})
export class AppModule {}
