import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '@kong/domain';

import {
  KongAccessTokenPayload,
  kongDecodeRefreshToken,
  kongIssueAccessToken,
  kongIssueRefreshToken,
  KongRefreshTokenPayload,
  kongVerifyRefreshToken,
} from '@kong-jwt';

@Injectable()
export class AuthTokensService {
  private secret = this.configService.get('AUTH_JWT_SECRET');

  constructor(private configService: ConfigService) {}

  public issueAccessToken(user: User): string {
    const payload: KongAccessTokenPayload = {
      sub: user.uuid,
      name: user.name,
    };

    return kongIssueAccessToken(payload, this.secret, { expiresIn: '1h' });
  }

  public issueRefreshToken(user: User): string {
    const payload: KongRefreshTokenPayload = {
      sub: user.uuid,
    };

    return kongIssueRefreshToken(payload, this.secret, { expiresIn: '2d' });
  }

  public verifyAccessToken(token: string) {
    return kongVerifyRefreshToken(token, this.secret);
  }

  public verifyRefreshToken(token: string) {
    return kongVerifyRefreshToken(token, this.secret);
  }

  public decodeAccessToken(token: string) {
    return kongDecodeRefreshToken(token);
  }

  public decodeRefreshToken(token: string) {
    return kongDecodeRefreshToken(token);
  }
}
