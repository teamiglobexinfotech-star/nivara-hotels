import { apiClient } from "@/lib/apiClient";

import type { User } from "./user.types";

export const userService = {
  getById: (): Promise<User> =>
    apiClient.get("/users/me").then((r) => r.data.data),
};
