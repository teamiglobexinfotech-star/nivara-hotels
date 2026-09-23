import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse } from "@/types/api.types";
import type { ApiResponse, KpiItem, ListParams } from "@/types/shared.types";

import type { RoomType } from "../roomTypes/roomType.types";

import type { CreateRoom } from "./schema/createRoom.schema";
import type { RoomList } from "./room.types";

export const roomService = {
  create: (data: CreateRoom): Promise<ApiMessageResponse> =>
    apiClient.post("/rooms", data).then((r) => r.data),
  getStats: (): Promise<KpiItem[]> =>
    apiClient.get("/rooms/stats").then((r) => r.data.data),
  getRooms: (params?: ListParams): Promise<ApiResponse<RoomList>> =>
    apiClient.get("/rooms", { params }).then((r) => r.data),
  getRoomTypes: (): Promise<RoomType[]> =>
    apiClient.get("/room-types").then((r) => r.data?.data),
};
