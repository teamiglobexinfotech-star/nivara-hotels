import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { UserService } from './user.service';
import { CurrentUser } from '../../common/decorators';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser('id') userId: string) {
    const data = await this.userService.getProfile(userId);
    return { data };
  }
}
