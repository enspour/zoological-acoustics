import * as jwt from 'jsonwebtoken';

import { KongAccessTokenPayload, KongRefreshTokenPayload } from '../interfaces';

export const kongIssueAccessToken = (
  payload: KongAccessTokenPayload,
  secret: string,
  options: jwt.SignOptions,
) => {
  return jwt.sign(payload, secret, options);
};

export const kongIssueRefreshToken = (
  payload: KongRefreshTokenPayload,
  secret: string,
  options: jwt.SignOptions,
) => {
  return jwt.sign(payload, secret, options);
};
