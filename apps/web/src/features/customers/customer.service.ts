import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse, ListResponse } from "@/types/api.types";
import type { KpiItem, ListParams } from "@/types/shared.types";

import type { CreateCustomer } from "./schema/createCustomer.schema";
import type { UpdateCustomer } from "./schema/updateCustomer.schema";
import type { CustomerList } from "./customer.types";

export const customerService = {
  create: (data: CreateCustomer): Promise<ApiMessageResponse> =>
    apiClient.post("/customers", data).then((r) => r.data),
  getAll: (params: ListParams): Promise<ListResponse<CustomerList[]>> =>
    apiClient.get("/customers", { params }).then((r) => r.data),
  update: (id: string, data: UpdateCustomer): Promise<ApiMessageResponse> =>
    apiClient.patch(`/customers/${id}`, data).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/customers/${id}`).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get(`/customers/${id}`).then((r) => r.data),
  getStats: (): Promise<KpiItem[]> =>
    apiClient.get("/customers/stats").then((r) => r.data.data),
};
