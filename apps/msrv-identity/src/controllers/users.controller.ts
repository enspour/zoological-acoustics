import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { KongAuthGuard } from '@kong-nest';

import { UsersService } from '@kong/msrv-feature-users';

import { UpdateUserDto } from '../dtos';

@Controller('users')
@UseGuards(KongAuthGuard)
@ApiCookieAuth('access-token')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':uuid')
  @ApiOperation({ summary: 'Get User by UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  public async get(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const user = await this.usersService.get(uuid);

    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return { statusCode: 200, data: { user } };
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update User by UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.usersService.update({ uuid, ...dto });
    return { statusCode: 200, data: { user } };
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remove User by UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  public async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const user = await this.usersService.remove(uuid);
    return { statusCode: 200, data: { user } };
  }
}
