import { Category } from '../../types';

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  category?: Category;
};
