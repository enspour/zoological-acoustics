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

import { TaskColumnsService } from '@kudu/msrv-feature-tasks';

import { AuthGuard } from '@kudu/msrv-util-auth-guard';

import { CreateTaskColumnDto } from '../dtos';

@Controller('columns')
@UseGuards(AuthGuard)
export class TaskColumnsController {
  constructor(private taskColumnsService: TaskColumnsService) {}

  @Get('by-board/:boardUuid')
  @ApiOperation({ summary: 'Get task columns by board' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getByBoard(
    @Param('boardUuid', new ParseUUIDPipe()) boardUuid: string,
  ) {
    const columns = await this.taskColumnsService.getByBoard(boardUuid);
    return { statusCode: 200, data: { columns } };
  }

  @Get('by-project/:projectUuid')
  @ApiOperation({ summary: 'Get task columns by project' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getByProject(
    @Param('projectUuid', new ParseUUIDPipe()) projectUuid: string,
  ) {
    const columns = await this.taskColumnsService.getByProject(projectUuid);
    return { statusCode: 200, data: { columns } };
  }

  @Post()
  @ApiOperation({ summary: 'Create task column' })
  @ApiBody({ type: CreateTaskColumnDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async create(@Body() dto: CreateTaskColumnDto) {
    const column = await this.taskColumnsService.create(dto);
    return { statusCode: 200, data: { column } };
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete task column By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const column = await this.taskColumnsService.delete(uuid);
    return { statusCode: 200, data: { column } };
  }
}
