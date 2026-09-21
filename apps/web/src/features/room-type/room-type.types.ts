export type RoomTypeStatus = "ACTIVE" | "INACTIVE";

export interface RoomTypeResponse {
  id: string;
  name: string;
  description: string;
  capacity: number;
  basePrice: number;
  status: RoomTypeStatus;
}
