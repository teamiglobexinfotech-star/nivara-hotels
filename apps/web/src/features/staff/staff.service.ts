import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse, ListResponse } from "@/types/api.types";
import type { ListParams } from "@/types/shared.types";

import type { CreateStaff } from "./schema/createStaff.schema";
import type { UpdateStaff } from "./schema/updateStaff.schema";
import type { Staff, StaffDetails } from "./staff.types";

export const staffService = {
  create: (data: CreateStaff): Promise<ApiMessageResponse> =>
    apiClient.post("/staff", data).then((r) => r.data),
  getAll: (params?: ListParams): Promise<ListResponse<Staff[]>> =>
    apiClient.get("/staff", { params }).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/staff/${id}`).then((r) => r.data),
  getById: (id: string): Promise<StaffDetails> =>
    apiClient.get(`/staff/${id}`).then((r) => r.data?.data),
  update: (id: string, data: UpdateStaff): Promise<ApiMessageResponse> =>
    apiClient.patch(`/staff/${id}`, data).then((r) => r.data),
};
