import { apiClient } from "@/lib/apiClient";
import type { CreateCustomer } from "./schema/createCustomer.schema";

export const customerService = {
  createCustomer: (data: CreateCustomer): Promise<{ message: string }> =>
    apiClient.post("/customers", data).then((r) => r.data),
};
