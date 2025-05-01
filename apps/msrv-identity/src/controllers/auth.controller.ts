import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '@kong/msrv-feature-auth';

import { LoginDto, SignupDto } from '../dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'System Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  public async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      dto.username,
      dto.password,
    );

    response.cookie('access-token', accessToken);
    response.cookie('refresh-token', refreshToken);

    return { statusCode: 200 };
  }

  @Post('signup')
  @ApiOperation({ summary: 'System Signup' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  public async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SignupDto,
  ) {
    const { username, password, ...rest } = dto;

    const { accessToken, refreshToken } = await this.authService.signup(
      username,
      password,
      rest,
    );

    response.cookie('access-token', accessToken);
    response.cookie('refresh-token', refreshToken);

    return { statusCode: 200 };
  }

  @Post('logout')
  @ApiOperation({ summary: 'System Logout' })
  @ApiCookieAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access-token', '');
    response.cookie('refresh-token', '');

    return { statusCode: 200 };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh Tokens' })
  @ApiCookieAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  public async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = request.cookies['refresh-token'];

    const { accessToken, refreshToken } = await this.authService.refresh(token);

    response.cookie('access-token', accessToken);
    response.cookie('refresh-token', refreshToken);

    return { statusCode: 200 };
  }
}
