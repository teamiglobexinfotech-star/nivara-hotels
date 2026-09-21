import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse } from "@/types/api.types";

import type { CreateAmenity } from "./schema/createAmenity.schema";
import type { UpdateAmenity } from "./schema/updateAmenity.schema";
import type { AmenityList } from "./amenity.types";

export const amenityService = {
  create: (data: CreateAmenity): Promise<ApiMessageResponse> =>
    apiClient.post("/amenities", data).then((response) => response.data),
  getAll: (): Promise<AmenityList[]> =>
    apiClient.get("/amenities").then((response) => response.data),
  update: (id: string, data: UpdateAmenity): Promise<ApiMessageResponse> =>
    apiClient.patch(`/amenities/${id}`, data).then((response) => response.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/amenities/${id}`).then((response) => response.data),
};
