export type RoomType = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  basePrice: number;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type RoomTypeList = RoomType;
