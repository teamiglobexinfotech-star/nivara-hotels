import { apiClient } from "@/lib/apiClient";
import type { UserProfile } from "@/types/user.types";

export const userService = {
  getProfile: (): Promise<UserProfile> =>
    apiClient.get("/users/me").then((r) => r.data.data),
};
