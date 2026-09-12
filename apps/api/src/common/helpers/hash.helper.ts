import * as argon2 from 'argon2';

export const hashPassword = async (str: string): Promise<string> => {
  return await argon2.hash(str);
};

export const comparePassword = async (
  raw: string,
  hashedStr: string,
): Promise<boolean> => {
  return await argon2.verify(hashedStr, raw);
};
