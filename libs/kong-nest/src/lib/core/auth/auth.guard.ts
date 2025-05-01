import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { kongVerifyAccessToken } from '@kong-jwt';

@Injectable()
export class KongAuthGuard implements CanActivate {
  private secret = this.configService.get('AUTH_JWT_SECRET');

  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const type = context.getType();

    if (type === 'http') {
      const http = context.switchToHttp();
      const request = http.getRequest<Request>();

      const token = request.cookies['access-token'];
      const isVerify = kongVerifyAccessToken(token, this.secret);

      if (!isVerify) {
        throw new UnauthorizedException();
      }
    }

    return true;
  }
}
