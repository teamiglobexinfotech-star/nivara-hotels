export type Amenity = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AmenityList = Amenity;
