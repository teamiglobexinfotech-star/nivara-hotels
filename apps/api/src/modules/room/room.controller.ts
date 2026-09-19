import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  async getRooms(
    @Query(new ValidationPipe(GetRoomsSchema)) query: GetRoomsDto,
  ) {
    const { items, pagination } = await this.roomService.getRooms(query);

    return { data: items, pagination };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRoomById(@Param('id') id: string) {
    const data = await this.roomService.getRoomById(id);
    return { data };
  }
}
