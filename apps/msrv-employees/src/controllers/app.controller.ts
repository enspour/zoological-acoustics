import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('health')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  checkHealth() {
    return { statusCode: 200 };
  }
}
