import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  SaveHousekeepingTaskDto,
  SaveHousekeepingTaskSchema,
} from './dtos/save-task.dto';
import { HOUSEKEEPING_TASK_SUCCESS_MSG } from './housekeepingtask.constants';
import { HousekeepingtaskService } from './housekeepingtask.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('tasks')
export class HousekeepingtaskController {
  constructor(
    private readonly housekeepingtaskService: HousekeepingtaskService,
  ) {}

  @Roles('ADMIN', 'MANAGER')
  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async saveTask(
    @Body(new ValidationPipe(SaveHousekeepingTaskSchema))
    body: SaveHousekeepingTaskDto,
  ) {
    const data = await this.housekeepingtaskService.saveTask(body);
    return apiResponse({ data, message: HOUSEKEEPING_TASK_SUCCESS_MSG.SAVED });
  }
}
