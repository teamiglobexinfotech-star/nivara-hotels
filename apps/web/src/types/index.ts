export type UserRole = "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
export type StaffCategory = "RECEPTIONIST" | "HOUSEKEEPER";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  category?: StaffCategory;
}

export interface AuthCTX {
  user: null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
