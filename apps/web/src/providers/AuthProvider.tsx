import type { AuthCTX } from "@/types";
import { createContext, type ReactNode } from "react";

const initialCTX: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialCTX);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: false,
        isLoading: false,
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
