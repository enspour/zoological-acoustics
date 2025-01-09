import * as jwt from 'jsonwebtoken';

export const signToken = <T extends object>(
  data: T,
  secret: string,
  options: jwt.SignOptions,
): string => {
  return jwt.sign(data, secret, options);
};

export const verifyToken = <T>(token: string, secret: string): T | null => {
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    return null;
  }
};

export const decodeToken = <T>(token: string): T => {
  return jwt.decode(token) as T;
};
