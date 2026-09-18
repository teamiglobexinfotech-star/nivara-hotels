import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { comparePassword, setCookies } from '../../common/helpers';
import { LoginDto } from './dtos/login.dto';
import { JwtPayload } from './auth.types';
import { AUTH_ERROR_MSG } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, res: Response): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        passwordHash: true,
        role: true,
        staff: {
          select: {
            category: true,
          },
        },
        status: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_CREDENTIALS);
    }

    if (user.status === 'INACTIVE') {
      throw new ForbiddenException(AUTH_ERROR_MSG.ACCOUNT_INACTIVE);
    }

    const isPasswordValid = await comparePassword(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_CREDENTIALS);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      category: user?.staff?.category,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    setCookies(res, accessToken);
  }
}
