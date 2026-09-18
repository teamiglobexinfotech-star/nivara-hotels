import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../common/decorators';
import { ValidationPipe } from '../../common/pipes';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { RoomTypeService } from './room-type.service';
import {
  CreateRoomTypeDto,
  CreateRoomTypeSchema,
} from './dtos/create-room-type.dto';
import { ROOM_TYPE_SUCCESS_MSG } from './room-type.constants';

@UseGuards(AuthGuard, RoleGuard)
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateRoomTypeSchema)) body: CreateRoomTypeDto,
  ) {
    const data = await this.roomTypeService.create(body);
    return {
      data,
      message: ROOM_TYPE_SUCCESS_MSG.CREATED,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRoomTypes() {
    const data = await this.roomTypeService.getRoomTypes();
    return { data };
  }
}
