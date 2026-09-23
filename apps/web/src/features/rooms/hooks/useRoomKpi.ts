import { useQuery } from "@tanstack/react-query";

import { roomKeys } from "../room.keys";
import { roomService } from "../room.service";

export function useRoomKpi() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomKeys.lists(),
    queryFn: roomService.getStats,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
