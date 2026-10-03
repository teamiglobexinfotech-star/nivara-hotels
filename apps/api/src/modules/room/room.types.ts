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
      id: string;
      icon: string | null;
      name: string;
    }[];
  };
};

export type RoomAvailableItem = {
  id: string;
  name: string | null;
  roomNumber: string;
  roomType: {
    id: string;
    name: string;
    capacity: number;
    basePrice: number;
  };
};

export type BrowseRoomItem = {
  id: string;
  name: string | null;
  roomNumber: string;
  available: true;
  roomType: {
    id: string;
    name: string;
    capacity: number;
    basePrice: number;
    amenities: {
      id: string;
      name: string;
      icon: string | null;
    }[];
    images: {
      id: string;
      url: string;
      altText: string | null;
    }[];
  };
};
