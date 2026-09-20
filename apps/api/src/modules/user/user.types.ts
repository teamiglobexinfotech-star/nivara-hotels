import { Category, UserRole } from '../../types';

export type UserProfileResponse = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category?: Category;
};
