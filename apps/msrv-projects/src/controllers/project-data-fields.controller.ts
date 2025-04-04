import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ProjectDataFieldsService } from '@kudu/msrv-feature-project-data-fields';

import { CreateProjectDataFieldDto } from '../dtos';

@Controller('data-fields')
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
}
