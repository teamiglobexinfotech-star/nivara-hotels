import { apiClient } from "@/lib/apiClient";
import type { ApiResponse, ListParams } from "@/types/shared.types";
import type { Customer } from "@/types/customer.types";
import type { CreateCustomer } from "./schema/createCustomer.schema";

export const customerService = {
  createCustomer: (data: CreateCustomer): Promise<{ message: string }> =>
    apiClient.post("/customers", data).then((r) => r.data),
  getCustomers: (params: ListParams): Promise<ApiResponse<Customer>> =>
    apiClient.get("/customers", { params }).then((r) => r.data),
};
