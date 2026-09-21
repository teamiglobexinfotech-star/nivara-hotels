import { apiClient } from "@/lib/apiClient";
import type { MessageResponse } from "@/types/api.types";
import type { CreateRoomType } from "./schema/room-type.schema";

export const roomTypeService = {
  create: (data: CreateRoomType): Promise<MessageResponse> =>
    apiClient.post("/room-types", data).then((response) => response.data),
  delete: (id: string): Promise<MessageResponse> =>
    apiClient.delete(`/room-types/${id}`).then((response) => response.data),
};
