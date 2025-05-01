import * as jwt from 'jsonwebtoken';

import { KongAccessTokenPayload, KongRefreshTokenPayload } from '../interfaces';

export const kongDecodeAccessToken = (
  token: string,
): KongAccessTokenPayload | null => {
  return jwt.decode(token) as KongAccessTokenPayload | null;
};

export const kongDecodeRefreshToken = (
  token: string,
): KongRefreshTokenPayload | null => {
  return jwt.decode(token) as KongRefreshTokenPayload | null;
};
