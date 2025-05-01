import {
  Body,
  Controller,
  Get,
  HttpStatus,
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

import { EmployeesService } from '@octo/msrv-feature-employees';

import { UpdateEmployeeDto } from '../dtos';

@Controller('employees')
@UseGuards(KongAuthGuard)
@ApiCookieAuth('access-token')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Get Employees' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getAll() {
    const employees = await this.employeeService.getAll();
    return { statusCode: 200, data: { employees } };
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get Employee By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  public async getByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const employee = await this.employeeService.getByUuid(uuid);
    return { statusCode: 200, data: { employee } };
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update Employee By UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID', required: true })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    const employee = await this.employeeService.update({ ...dto, uuid });
    return { statusCode: 200, data: { employee } };
  }
}
