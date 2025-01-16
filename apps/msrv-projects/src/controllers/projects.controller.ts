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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ProjectsService } from '@kudu/msrv-feature-projects';

import { CreateProjectDto, UpdateProjectDto } from '../dtos';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Projects' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getAll() {
    const projects = await this.projectsService.getAll();
    return { statusCode: 200, data: { projects } };
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get Project By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  public async getByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const project = await this.projectsService.getByUuid(uuid);
    return { statusCode: 200, data: { project } };
  }

  @Post()
  @ApiOperation({ summary: 'Create Project By UUID' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async create(@Body() dto: CreateProjectDto) {
    const project = await this.projectsService.create(dto);
    return { statusCode: 200, data: { project } };
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update Project By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update({ ...dto, uuid });
    return { statusCode: 200, data: { project } };
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete Project By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const project = await this.projectsService.delete(uuid);
    return { statusCode: 200, data: { project } };
  }
}
