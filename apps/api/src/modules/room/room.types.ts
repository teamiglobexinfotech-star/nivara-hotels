import { HousekeepingStatus, OccupancyStatus } from '../../types';

export type Room = {
  id: string;
  name: string | null;
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  description: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type RoomList = Room & { roomType: { id: string; name: string } };

export type RoomDetails = {
  id: string;
  name: string | null;
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
    basePrice: number;
    isActive: boolean;

    amenities: {
      amenity: {
        id: string;
        iconKey: string | null;
        name: string;
      };
    }[];
  };
};
