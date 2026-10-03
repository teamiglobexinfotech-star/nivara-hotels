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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { MAX_FILE_SIZE } from '../../common/constants';
import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { fileValidationPipe, ValidationPipe } from '../../common/pipes';

import { CreateStaffDto, CreateStaffSchema } from './dtos/create-staff.dto';
import { GetStaffDto, GetStaffSchema } from './dtos/get-staff.dto';
import { UpdateStaffDto, UpdateStaffSchema } from './dtos/update-staff.dto';
import { STAFF_SUCCESS_MSG } from './staff.constants';
import { StaffService } from './staff.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Roles('ADMIN', 'MANAGER')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idProof', maxCount: 1 },
        { name: 'signature', maxCount: 1 },
      ],
      fileValidationPipe(MAX_FILE_SIZE, 2),
    ),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @UploadedFiles()
    files: { idProof: []; signature: [] },
    @Body(new ValidationPipe(CreateStaffSchema)) body: CreateStaffDto,
  ) {
    const data = await this.staffService.create(files, body);
    return apiResponse({ data, message: STAFF_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query(new ValidationPipe(GetStaffSchema)) query: GetStaffDto) {
    const { data, meta } = await this.staffService.getAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.staffService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get('housekeepers')
  @HttpCode(HttpStatus.OK)
  async getHousekeepers(
    @Query(new ValidationPipe(GetStaffSchema)) query: GetStaffDto,
  ) {
    const data = await this.staffService.getHousekeepers(query.search || '');
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const data = await this.staffService.getOne(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateStaffSchema)) body: UpdateStaffDto,
  ) {
    const data = await this.staffService.update(id, body);
    return apiResponse({ data, message: STAFF_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const data = await this.staffService.delete(id);
    return apiResponse({ data, message: STAFF_SUCCESS_MSG.SOFT_DELETED });
  }
}
