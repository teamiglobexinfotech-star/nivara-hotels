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
import { ValidationPipe } from '../../common/pipes';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { AmenityService } from './amenity.service';
import {
  CreateAmenityDto,
  CreateAmenitySchema,
} from './dtos/create-amenity.dto';
import { AMENITY_SUCCESS_MSG } from './amenity.constants';
import {
  UpdateAmenityDto,
  UpdateAmenitySchema,
} from './dtos/update-amenity.dto';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateAmenitySchema)) body: CreateAmenityDto,
  ) {
    const data = await this.amenityService.create(body);

    return { data, message: AMENITY_SUCCESS_MSG.CREATED };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const data = await this.amenityService.getAll();
    return { data };
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateAmenitySchema)) body: UpdateAmenityDto,
  ) {
    const data = await this.amenityService.update(id, body);
    return { data, message: AMENITY_SUCCESS_MSG.UPDATED };
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.amenityService.delete(id);
  }
}
