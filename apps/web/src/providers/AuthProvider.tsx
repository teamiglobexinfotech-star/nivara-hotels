import { createContext, type ReactNode } from "react";

import { useGetUser } from "@/features/users/hooks/useGetUser";
import type { AuthCTX } from "@/types/shared.types";

const initialCTX: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialCTX);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useGetUser();

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
