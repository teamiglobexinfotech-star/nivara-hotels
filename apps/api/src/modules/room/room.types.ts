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
