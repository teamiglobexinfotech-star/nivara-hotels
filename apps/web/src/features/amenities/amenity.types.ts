export type Amenity = {
  id: string;
  name: string;
  description: string | null;
  iconKey: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AmenityList = Amenity;
