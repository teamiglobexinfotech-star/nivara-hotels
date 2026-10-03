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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { MAX_FILE_SIZE, MAX_FILES } from '../../common/constants';
import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';
import { fileValidationPipe, ValidationPipe } from '../../common/pipes';

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

@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @UseInterceptors(
    AnyFilesInterceptor(fileValidationPipe(MAX_FILE_SIZE, MAX_FILES)),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateRoomTypeSchema)) body: CreateRoomTypeDto,
    @UploadedFiles() files,
  ) {
    const data = await this.roomTypeService.create(files, body);
    return apiResponse({ data, message: ROOM_TYPE_SUCCESS_MSG.CREATED });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const data = await this.roomTypeService.getAll();
    return apiResponse({ data });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const data = await this.roomTypeService.getOne(id);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') roomId: string) {
    const data = await this.roomTypeService.delete(roomId);
    return apiResponse({ data, message: ROOM_TYPE_SUCCESS_MSG.DELETED });
  }
}
