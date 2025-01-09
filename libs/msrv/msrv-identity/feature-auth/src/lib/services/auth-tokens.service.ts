import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '@kudu/domain';
import { decodeToken, signToken, verifyToken } from '@kudu/msrv-util-jwt';

import { AccessTokenPayload, RefreshTokenPayload } from '../interfaces';

@Injectable()
export class AuthTokensService {
  private secret = this.configService.get('AUTH_JWT_SECRET');

  constructor(private configService: ConfigService) {}

  public issueAccessToken(user: User): string {
    const payload: AccessTokenPayload = {
      sub: user.uuid,
      name: user.name,
    };

    return signToken(payload, this.secret, { expiresIn: '1h' });
  }

  public issueRefreshToken(user: User): string {
    const payload: RefreshTokenPayload = {
      sub: user.uuid,
    };

    return signToken(payload, this.secret, { expiresIn: '2d' });
  }

  public verify<T>(token: string): T | null {
    return verifyToken(token, this.secret) as T | null;
  }

  public decode<T>(token: string): T {
    return decodeToken(token) as T;
  }
}
