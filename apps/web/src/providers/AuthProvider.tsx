import { createContext, type ReactNode } from "react";
import { useProfile } from "@/features/user/hooks/useProfile";
import type { AuthCTX } from "@/types/shared.types";

const initialCTX: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialCTX);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useProfile();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data,
        isLoading: isLoading,
        user: data || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
