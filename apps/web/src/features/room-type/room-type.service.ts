import { apiClient } from "@/lib/apiClient";
import type { MessageResponse } from "@/types/api.types";
import type { CreateRoomType, UpdateRoomType } from "./schema/room-type.schema";

export const roomTypeService = {
  create: (data: CreateRoomType): Promise<MessageResponse> =>
    apiClient.post("/room-types", data).then((response) => response.data),
  update: (id: string, data: UpdateRoomType): Promise<MessageResponse> =>
    apiClient
      .patch(`/room-types/${id}`, data)
      .then((response) => response.data),
  delete: (id: string): Promise<MessageResponse> =>
    apiClient.delete(`/room-types/${id}`).then((response) => response.data),
};
