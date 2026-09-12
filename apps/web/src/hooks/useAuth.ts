import { useContext } from "react";
import { AuthContext } from "@/providers";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth hook used outside the AuthProvider.");
  }
  return ctx;
}
