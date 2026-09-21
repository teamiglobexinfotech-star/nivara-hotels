import { apiClient } from "@/lib/apiClient";
import type { MessageResponse } from "@/types/api.types";
import type { Room, RoomType } from "@/types/room.types";
import type { ApiResponse, KpiItem, ListParams } from "@/types/shared.types";
import type { CreateRoom } from "./schema/createRoom.schema";

export const roomService = {
  create: (data: CreateRoom): Promise<MessageResponse> =>
    apiClient.post("/rooms", data).then((r) => r.data),
  getStats: (): Promise<KpiItem[]> =>
    apiClient.get("/rooms/stats").then((r) => r.data.data),
  getRooms: (params?: ListParams): Promise<ApiResponse<Room>> =>
    apiClient.get("/rooms", { params }).then((r) => r.data),
  getRoomTypes: (): Promise<RoomType[]> =>
    apiClient.get("/room-types").then((r) => r.data?.data),
};
