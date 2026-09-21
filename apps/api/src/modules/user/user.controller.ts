import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';

import { UserService } from './user.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getById(@CurrentUser('id') userId: string) {
    const data = await this.userService.getById(userId);
    return apiResponse({ data });
  }
}
