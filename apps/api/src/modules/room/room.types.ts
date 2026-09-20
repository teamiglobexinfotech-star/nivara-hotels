import {
  AmenityStatus,
  HousekeepingStatus,
  OccupancyStatus,
  RoomTypeStatus,
} from '../../types';

export type CreateRoomResponse = {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  description: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
  createdAt: Date;
};

export type RoomListItemResponse = {
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
};

export type RoomDetailsResponse = {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  description: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roomType: {
    id: string;
    name: string;
    description: string | null;
    capacity: number;
    basePrice: any;
    status: RoomTypeStatus;
    roomTypeAmenities: {
      amenity: {
        id: string;
        name: string;
        description: string | null;
        icon: string | null;
        status: AmenityStatus;
      };
    }[];
  };
};

export type UpdateRoomResponse = {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
};

export type RoomStat = {
  id: string;
  icon: string;
  title: string;
  value: string | number;
  detail: string;
};

export type RoomStatsResponse = RoomStat[];
