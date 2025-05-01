import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { KongAuthGuard } from '@kong-nest';

import { TaskBoardsService } from '@octo/msrv-feature-tasks';

import { CreateTaskBoardDto } from '../dtos';

@Controller('boards')
@UseGuards(KongAuthGuard)
export class TaskBoardsController {
  constructor(private taskBoardsService: TaskBoardsService) {}

  @Get('by-project/:projectUuid')
  @ApiOperation({ summary: 'Get task board by project' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getByProject(
    @Param('projectUuid', new ParseUUIDPipe()) projectUuid: string,
  ) {
    const boards = await this.taskBoardsService.getByProject(projectUuid);
    return { statusCode: 200, data: { boards } };
  }

  @Post()
  @ApiOperation({ summary: 'Create task board' })
  @ApiBody({ type: CreateTaskBoardDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async create(@Body() dto: CreateTaskBoardDto) {
    const board = await this.taskBoardsService.create(dto);
    return { statusCode: 200, data: { board } };
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete task board By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const board = await this.taskBoardsService.delete(uuid);
    return { statusCode: 200, data: { board } };
  }
}
