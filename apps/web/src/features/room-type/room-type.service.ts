import { apiClient } from "@/lib/apiClient";
import type { MessageResponse } from "@/types/api.types";
import type { CreateRoomType } from "./schema/room-type.schema";

export const roomTypeService = {
  create: (data: CreateRoomType): Promise<MessageResponse> =>
    apiClient.post("/room-types", data).then((response) => response.data),
};
