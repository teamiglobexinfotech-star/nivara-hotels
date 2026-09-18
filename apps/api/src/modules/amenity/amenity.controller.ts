import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@UseGuards(AuthGuard, RoleGuard)
@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Roles('ADMIN')
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
  async getAmenities() {
    const data = await this.amenityService.getAmenities();
    return { data };
  }
}
