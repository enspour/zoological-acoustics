import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

import { KongAuthGuard } from '@kong-nest';

import { TasksService } from '@octo/msrv-feature-tasks';

import { CreateTaskDto, GetByQueryDto, UpdateTaskDto } from '../dtos';

@Controller('tasks')
@UseGuards(KongAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('by-query')
  @ApiOperation({ summary: 'Get Task By Query' })
  @ApiQuery({ name: 'query', description: 'query', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getByQuery(@Query() query: GetByQueryDto) {
    const tasks = await this.tasksService.getByQuery(query);
    return { statusCode: 200, data: { tasks } };
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get Task By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  public async getByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const task = await this.tasksService.getByUuid(uuid);

    if (!task) {
      throw new NotFoundException('Задача не найдена!');
    }

    return { statusCode: 200, data: { task } };
  }

  @Post()
  @ApiOperation({ summary: 'Create Task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async create(@Body() dto: CreateTaskDto) {
    const task = await this.tasksService.create(dto);
    return { statusCode: 200, data: { task } };
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update Task By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update({ ...dto, uuid });
    return { statusCode: 200, data: { task } };
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete Task By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const task = await this.tasksService.delete(uuid);
    return { statusCode: 200, data: { task } };
  }
}
