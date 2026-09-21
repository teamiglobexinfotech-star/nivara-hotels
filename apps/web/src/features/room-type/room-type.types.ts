export type RoomStatus = "ACTIVE" | "INACTIVE";

export interface RoomResponse {
  id: string;
  name: string;
  description: string;
  capacity: number;
  basePrice: number;
  status: RoomStatus;
}
