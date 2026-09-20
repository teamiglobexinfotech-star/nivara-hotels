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
import { ValidationPipe } from '../../common/pipes';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { RoomTypeService } from './room-type.service';
import {
  CreateRoomTypeDto,
  CreateRoomTypeSchema,
} from './dtos/create-room-type.dto';
import { ROOM_TYPE_SUCCESS_MSG } from './room-type.constants';
import {
  UpdateRoomTypeDto,
  UpdateRoomTypeSchema,
} from './dtos/update-room-type.dto';

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
  async getAll() {
    const data = await this.roomTypeService.getAll();
    return { data };
  }

  @Roles('ADMIN')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateRoomTypeSchema)) body: UpdateRoomTypeDto,
  ) {
    const data = await this.roomTypeService.update(id, body);
    return { data, message: ROOM_TYPE_SUCCESS_MSG.UPDATED };
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') roomId: string): Promise<void> {
    await this.roomTypeService.delete(roomId);
  }
}
