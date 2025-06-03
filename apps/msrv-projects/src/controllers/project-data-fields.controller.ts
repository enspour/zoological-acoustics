import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { KongAuthGuard } from '@kong-nest';

import { ProjectDataFieldsService } from '@kraken/msrv-feature-project-data-fields';

import { CreateProjectDataFieldDto, UpdateProjectDataFieldDto } from '../dtos';

@Controller('data-fields')
@UseGuards(KongAuthGuard)
export class ProjectDataFieldsController {
  constructor(private projectDataFieldsService: ProjectDataFieldsService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Project Data Fields' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getAll() {
    const fields = await this.projectDataFieldsService.getAll();
    return { statusCode: 200, data: { fields } };
  }

  @Post()
  @ApiOperation({ summary: 'Create Project Data Field' })
  @ApiBody({ type: CreateProjectDataFieldDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async create(@Body() dto: CreateProjectDataFieldDto) {
    const field = await this.projectDataFieldsService.create(dto);
    return { statusCode: 200, data: { field } };
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update Project Data Field' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiBody({ type: UpdateProjectDataFieldDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: UpdateProjectDataFieldDto,
  ) {
    const field = await this.projectDataFieldsService.update({ uuid, ...dto });
    return { statusCode: 200, data: { field } };
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete Project Data Field' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const field = await this.projectDataFieldsService.delete(uuid);
    return { statusCode: 200, data: { field } };
  }
}
