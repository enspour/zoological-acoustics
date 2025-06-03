import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { KongAuthGuard } from '@kong-nest';

import { ProjectDataValuesService } from '@kraken/msrv-feature-project-data-fields';

import { CreateProjectDataValueDto } from '../dtos';

@Controller('data-fields/:uuid/values')
@UseGuards(KongAuthGuard)
export class ProjectDataValuesController {
  constructor(private projectDataValuesService: ProjectDataValuesService) {}

  @Post()
  @ApiOperation({ summary: 'Create Project Data Value' })
  @ApiBody({ type: CreateProjectDataValueDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async create(
    @Param('uuid', new ParseUUIDPipe()) fieldUuid: string,
    @Body() dto: CreateProjectDataValueDto,
  ) {
    const value = await this.projectDataValuesService.create({
      ...dto,
      fieldUuid,
    });

    return { statusCode: 200, data: { value } };
  }
}
