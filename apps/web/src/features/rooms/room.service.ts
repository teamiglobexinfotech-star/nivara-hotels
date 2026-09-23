import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse, ListResponse } from "@/types/api.types";
import type { KpiItem, ListParams } from "@/types/shared.types";

import type { CreateRoom } from "./schema/createRoom.schema";
import type { UpdateRoom } from "./schema/updateRoom.schema";
import type { RoomDetails, RoomList } from "./room.types";

export const roomService = {
  create: (data: CreateRoom): Promise<ApiMessageResponse> =>
    apiClient.post("/rooms", data).then((r) => r.data),
  getStats: (): Promise<KpiItem[]> =>
    apiClient.get("/rooms/stats").then((r) => r.data.data),
  getRooms: (params?: ListParams): Promise<ListResponse<RoomList[]>> =>
    apiClient.get("/rooms", { params }).then((r) => r.data),
  getById: (id: string): Promise<RoomDetails> =>
    apiClient.get(`/rooms/${id}`).then((r) => r.data?.data),
  update: (id: string, data: UpdateRoom): Promise<ApiMessageResponse> =>
    apiClient.patch(`/rooms/${id}`, data).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/rooms/${id}`).then((r) => r.data),
};
