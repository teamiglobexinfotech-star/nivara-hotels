import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  CreateRoomTypeDto,
  CreateRoomTypeSchema,
} from './dtos/create-room-type.dto';
import {
  UpdateRoomTypeDto,
  UpdateRoomTypeSchema,
} from './dtos/update-room-type.dto';
import { ROOM_TYPE_SUCCESS_MSG } from './room-type.constants';
import { RoomTypeService } from './room-type.service';

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
    return apiResponse({
      data,
      message: ROOM_TYPE_SUCCESS_MSG.CREATED,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const data = await this.roomTypeService.getAll();
    return apiResponse({ data });
  }

  @Roles('ADMIN')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateRoomTypeSchema)) body: UpdateRoomTypeDto,
  ) {
    const data = await this.roomTypeService.update(id, body);
    return apiResponse({ data, message: ROOM_TYPE_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') roomId: string) {
    const data = await this.roomTypeService.delete(roomId);
    return apiResponse({ data, message: ROOM_TYPE_SUCCESS_MSG.DELETED });
  }
}
