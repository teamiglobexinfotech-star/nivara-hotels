export type RoomType = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomTypeList = RoomType;
