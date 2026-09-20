import { AmenityStatus } from '../../types';

export type CreateAmenityResponse = {
  id: string;
  name: string;
  icon: string | null;
  status: AmenityStatus;
  createdAt: Date;
};

export type AmenityListItemResponse = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  status: AmenityStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateAmenityResponse = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  status: AmenityStatus;
};
