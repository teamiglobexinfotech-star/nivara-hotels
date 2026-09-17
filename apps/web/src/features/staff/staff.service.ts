import { apiClient } from "@/lib/apiClient";
import type { CreateStaff } from "./schema/createStaff.schema";

export const staffService = {
  createStaff: (data: CreateStaff): Promise<{ message: string }> =>
    apiClient.post("/staff", data).then((r) => r.data),
};
