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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { ValidationPipe } from '../../common/pipes';
import { Roles } from '../../common/decorators';
import { RoomService } from './room.service';
import { CreateRoomDto, CreateRoomSchema } from './dtos/create-room.dto';
import { GetRoomsDto, GetRoomsSchema } from './dtos/get-rooms.dto';
import { ROOM_SUCCESS_MSG } from './room.constants';
import { UpdateRoomDto, UpdateRoomSchema } from './dtos/update-room.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateRoomSchema)) body: CreateRoomDto,
  ) {
    const data = await this.roomService.create(body);

    return {
      data,
      message: ROOM_SUCCESS_MSG.CREATED,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query(new ValidationPipe(GetRoomsSchema)) query: GetRoomsDto) {
    const { items, pagination } = await this.roomService.getAll(query);

    return { items, pagination };
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.roomService.getStats();
    return { data };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    const data = await this.roomService.getById(id);
    return { data };
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateRoomSchema)) body: UpdateRoomDto,
  ) {
    const data = await this.roomService.update(id, body);
    return { data, message: ROOM_SUCCESS_MSG.UPDATED };
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') roomId: string): Promise<void> {
    await this.roomService.delete(roomId);
  }
}
