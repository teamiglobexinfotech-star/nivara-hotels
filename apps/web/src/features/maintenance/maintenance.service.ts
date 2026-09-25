import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse, ListResponse } from "@/types/api.types";
import type { KpiItem, ListParams } from "@/types/shared.types";

import type { CreateReport } from "./schema/createReport.schema";
import type { SaveHousekeepingTask } from "./schema/save-task.schema";
import type {
  HousekeeperList,
  ReportDetails,
  ReportList,
} from "./maintenance.types";

export const maintenanceService = {
  create: (data: CreateReport): Promise<ApiMessageResponse> =>
    apiClient.post("/maintenance/reports", data).then((r) => r.data),
  getById: (id: string): Promise<ReportDetails> =>
    apiClient.get(`/maintenance/reports/${id}`).then((r) => r.data?.data),
  getStats: (): Promise<KpiItem[]> =>
    apiClient.get("/maintenance/reports/stats").then((r) => r.data.data),
  getAll: (params?: ListParams): Promise<ListResponse<ReportList[]>> =>
    apiClient.get("/maintenance/reports", { params }).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/maintenance/reports/${id}`).then((r) => r.data),
  // Housekeepers
  getHousekeepers: (search?: string): Promise<HousekeeperList[]> =>
    apiClient
      .get(`/staff/housekeepers`, { params: { search } })
      .then((r) => r.data?.data),
  saveTask: (data: SaveHousekeepingTask): Promise<ApiMessageResponse> =>
    apiClient.post("/tasks/save", data).then((r) => r.data),
};
