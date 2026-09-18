import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ValidationPipe } from '../../common/pipes';
import { AuthGuard } from '../../common/guards';
import { clearCookies } from '../../common/helpers';
import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dtos/login.dto';
import { AUTH_SUCCESS_MSG } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ValidationPipe(LoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(body, res);
    return { message: AUTH_SUCCESS_MSG.LOGIN };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    clearCookies(res);
    return { message: AUTH_SUCCESS_MSG.LOGOUT };
  }
}
