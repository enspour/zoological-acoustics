import * as bcrypt from 'bcrypt';

export const kongHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const kongComparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
