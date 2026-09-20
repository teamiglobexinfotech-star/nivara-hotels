import { RoomTypeStatus } from '../../types';

export type CreateRoomTypeResponse = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: any;
  status: RoomTypeStatus;
  createdAt: Date;
};

export type RoomTypeListItemResponse = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: any;
  status: RoomTypeStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateRoomTypeResponse = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: any;
  status: RoomTypeStatus;
};
