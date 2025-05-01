import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { KongAuthGuard } from '@kong-nest';

import { ProjectMembersService } from '@octo/msrv-feature-project-members';

@Controller('projects/:projectUuid/members')
@UseGuards(KongAuthGuard)
export class ProjectMembersController {
  constructor(private projectMembersService: ProjectMembersService) {}

  @Get()
  @ApiOperation({ summary: 'Get Members Of Project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getAll(
    @Param('projectUuid', new ParseUUIDPipe()) projectUuid: string,
  ) {
    const members = await this.projectMembersService.getAll(projectUuid);
    return { statusCode: 200, data: { members } };
  }

  @Post(':memberUuid')
  @ApiOperation({ summary: 'Append Member To Project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async append(
    @Param('projectUuid', new ParseUUIDPipe()) projectUuid: string,
    @Param('memberUuid', new ParseUUIDPipe()) memberUuid: string,
  ) {
    const member = await this.projectMembersService.append(
      projectUuid,
      memberUuid,
    );

    return { statusCode: 200, data: { member } };
  }

  @Delete(':memberUuid')
  @ApiOperation({ summary: 'Delete Member From Project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async delete(
    @Param('projectUuid', new ParseUUIDPipe()) projectUuid: string,
    @Param('memberUuid', new ParseUUIDPipe()) memberUuid: string,
  ) {
    const member = await this.projectMembersService.remove(
      projectUuid,
      memberUuid,
    );

    return { statusCode: 200, data: { member } };
  }
}
