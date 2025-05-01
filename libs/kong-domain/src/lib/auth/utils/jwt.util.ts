import * as jwt from 'jsonwebtoken';

export const kongSignToken = <T extends object>(
  data: T,
  secret: string,
  options: jwt.SignOptions,
): string => {
  return jwt.sign(data, secret, options);
};

export const kongVerifyToken = <T>(token: string, secret: string): T | null => {
  try {
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
};

export const kongDecodeToken = <T>(token: string): T => {
  return jwt.decode(token) as T;
};
