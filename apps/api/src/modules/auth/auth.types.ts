import { Category } from '../../types';

export type JwtPayload = {
  id: string;
  email: string;
  role: string;
  category?: Category;
};
