import type { AuthCTX, User } from "@/types";
import { createContext, type ReactNode } from "react";

const initialCTX: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialCTX);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dummyUser: User = {
    fullName: "Alex Brown",
    email: "alex.brown@ex.com",
    id: "1124124",
    role: "MANAGER",
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: true,
        isLoading: false,
        user: dummyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
