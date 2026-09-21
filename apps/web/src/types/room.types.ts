export type RoomTypeStatus = "ACTIVE" | "INACTIVE";
export type HousekeepingStatus = "CLEAN" | "DIRTY" | "CLEANING";
export type OccupancyStatus =
  "VACANT" | "RESERVED" | "OCCUPIED" | "OUT_OF_ORDER";

export interface Room {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  description: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
  roomType: {
    id: string;
    name: string;
    description: string | null;
    capacity: number;
    basePrice: any;
    status: RoomTypeStatus;
  };
}

export type RoomType = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: any;
  status: RoomTypeStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface AvailableRoom {
  id: string;
  roomNumber: string;
  roomTypeName: string;
  floor: number;
  nightlyRate: number;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
}
