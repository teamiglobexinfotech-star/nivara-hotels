import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from './config';
import { PrismaModule } from './db/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './seed/seed.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
