export type Image = {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

export type RoomTypeBase = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: number;
  isActive: boolean;
};

export type RoomTypeCreate = RoomTypeBase;

export type RoomTypeList = RoomTypeBase & {
  image: Image;
};

export type RoomTypeDetails = RoomTypeBase & {
  images: Image[];
};
