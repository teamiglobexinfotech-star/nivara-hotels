export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';
export type StaffCategory = 'RECEPTIONIST';

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  category?: StaffCategory;
}
