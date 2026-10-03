export type Image = {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

export type Amenity = {
  id: string;
  name: string;
  icon: string | null;
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
  amenities: Amenity[];
};

export type RoomTypeDetails = RoomTypeBase & {
  images: Image[];
  amenities: Amenity[];
};
