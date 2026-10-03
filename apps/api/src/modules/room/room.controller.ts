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

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { BrowseRoomsDto, BrowseRoomsSchema } from './dtos/browse-rooms.dto';
import { CreateRoomDto, CreateRoomSchema } from './dtos/create-room.dto';
import { GetRoomsDto, GetRoomsSchema } from './dtos/get-rooms.dto';
import {
  RoomAvailabilityDto,
  RoomAvailabilitySchema,
} from './dtos/room-availability.dto';
import { UpdateRoomDto, UpdateRoomSchema } from './dtos/update-room.dto';
import { ROOM_SUCCESS_MSG } from './room.constants';
import { RoomService } from './room.service';

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
    return apiResponse({ data, message: ROOM_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query(new ValidationPipe(GetRoomsSchema)) query: GetRoomsDto) {
    const { data, meta } = await this.roomService.getAll(query);
    return apiListResponse({ data, meta });
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.roomService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get('availability')
  @HttpCode(HttpStatus.OK)
  async getAvailableRooms(
    @Query(new ValidationPipe(RoomAvailabilitySchema))
    query: RoomAvailabilityDto,
  ) {
    const data = await this.roomService.getAvailableRooms(
      query.checkIn,
      query.checkOut,
      query.capacity,
    );
    return apiResponse({ data });
  }

  @Roles('CUSTOMER')
  @Get('browse')
  @HttpCode(HttpStatus.OK)
  async browseRooms(
    @Query(new ValidationPipe(BrowseRoomsSchema)) query: BrowseRoomsDto,
  ) {
    const data = await this.roomService.browseRooms(query);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    const data = await this.roomService.getById(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateRoomSchema)) body: UpdateRoomDto,
  ) {
    const data = await this.roomService.update(id, body);
    return apiResponse({ data, message: ROOM_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') roomId: string) {
    const data = await this.roomService.delete(roomId);
    return apiResponse({ data, message: ROOM_SUCCESS_MSG.DELETED });
  }
}
