import * as jwt from 'jsonwebtoken';

import { KongAccessTokenPayload, KongRefreshTokenPayload } from '../interfaces';

export const kongVerifyAccessToken = (
  token: string,
  secret: string,
): KongAccessTokenPayload | null => {
  try {
    return jwt.verify(token, secret) as KongAccessTokenPayload;
  } catch {
    return null;
  }
};

export const kongVerifyRefreshToken = (
  token: string,
  secret: string,
): KongRefreshTokenPayload | null => {
  try {
    return jwt.verify(token, secret) as KongRefreshTokenPayload;
  } catch {
    return null;
  }
};
