import { apiClient } from "@/lib/apiClient";
import type { Customer } from "@/types/customer.types";
import type { ApiResponse, ListParams } from "@/types/shared.types";

import type { CreateCustomer } from "./schema/createCustomer.schema";
import type { UpdateCustomer } from "./schema/updateCustomer.schema";

export const customerService = {
  createCustomer: (data: CreateCustomer): Promise<{ message: string }> =>
    apiClient.post("/customers", data).then((r) => r.data),
  getCustomers: (params: ListParams): Promise<ApiResponse<Customer>> =>
    apiClient.get("/customers", { params }).then((r) => r.data),
  updateCustomer: (
    id: string,
    data: UpdateCustomer
  ): Promise<{ message: string }> =>
    apiClient.patch(`/customers/${id}`, data).then((r) => r.data),
  deleteCustomer: (id: string): Promise<{ message: string }> =>
    apiClient.delete(`/customers/${id}`).then((r) => r.data),
  getCustomerById: (id: string) =>
    apiClient.get(`/customers/${id}`).then((r) => r.data),
};
