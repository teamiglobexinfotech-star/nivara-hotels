import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse } from "@/types/api.types";

import type { CreateRoomType } from "./schema/createRoomType.schema";
import type { UpdateRoomType } from "./schema/updateRoomType.schema";
import type { RoomTypeList } from "./roomType.types";

export const roomTypeService = {
  create: (data: CreateRoomType): Promise<ApiMessageResponse> =>
    apiClient.post("/room-types", data).then((response) => response.data),
  getAll: (): Promise<RoomTypeList[]> =>
    apiClient.get("/room-types").then((response) => response.data),
  update: (id: string, data: UpdateRoomType): Promise<ApiMessageResponse> =>
    apiClient
      .patch(`/room-types/${id}`, data)
      .then((response) => response.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/room-types/${id}`).then((response) => response.data),
};
