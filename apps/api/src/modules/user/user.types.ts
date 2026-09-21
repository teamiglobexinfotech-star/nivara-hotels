import { Category, UserRole } from '../../types';

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category?: Category;
  profileImage: {
    id: string;
    fileId: string;
    altText: string | null;
  } | null;
};
