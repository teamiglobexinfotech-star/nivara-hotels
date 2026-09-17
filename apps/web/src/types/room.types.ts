export type RoomTypesStatus = "ACTIVE" | "INACTIVE";
export type HousekeepingStatus = "CLEAN" | "DIRTY" | "CLEANING";
export type OccupancyStatus =
  "VACANT" | "RESERVED" | "OCCUPIED" | "OUT_OF_ORDER";

export interface Room {
  id: string;
  name: string;
  roomNumber: string;
  roomTypeName?: string;
  floor: number;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  status: RoomTypesStatus;
}
