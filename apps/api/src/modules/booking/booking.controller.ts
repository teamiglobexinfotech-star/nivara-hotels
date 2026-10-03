import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  GetMyBookingsDto,
  GetMyBookingsSchema,
} from './dtos/get-my-bookings.dto';
import { BookingService } from './booking.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles('CUSTOMER')
  @Get('my-bookings')
  @HttpCode(HttpStatus.OK)
  async getMyBookings(
    @CurrentUser('id') customerId: string,
    @Query(new ValidationPipe(GetMyBookingsSchema)) query: GetMyBookingsDto,
  ) {
    const data = await this.bookingService.getMyBookings(customerId, query);
    return apiResponse({ data });
  }
}
