import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  KongAccessTokenPayload,
  KongRefreshTokenPayload,
  KongUser,
  kongDecodeToken,
  kongSignToken,
  kongVerifyToken,
} from '@kong-domain';

@Injectable()
export class AuthTokensService {
  private secret = this.configService.get('AUTH_JWT_SECRET');

  constructor(private configService: ConfigService) {}

  public issueAccessToken(user: KongUser): string {
    const payload: KongAccessTokenPayload = {
      sub: user.uuid,
      name: user.name,
    };

    return kongSignToken(payload, this.secret, { expiresIn: '1h' });
  }

  public issueRefreshToken(user: KongUser): string {
    const payload: KongRefreshTokenPayload = {
      sub: user.uuid,
    };

    return kongSignToken(payload, this.secret, { expiresIn: '2d' });
  }

  public verify<T>(token: string): T | null {
    return kongVerifyToken(token, this.secret) as T | null;
  }

  public decode<T>(token: string): T {
    return kongDecodeToken(token) as T;
  }
}
