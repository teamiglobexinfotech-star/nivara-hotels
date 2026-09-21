import { useQuery } from "@tanstack/react-query";

import { roomService } from "../room.service";

export function useRoomType() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["room-types"],
    queryFn: () => roomService.getRoomTypes(),
    placeholderData: (previousData) => previousData,
  });
  const items = data as [];

  return {
    items,
    isLoading,
    isError,
    refetch,
  };
}
