import { useQuery } from "@tanstack/react-query";

import { roomService } from "../room.service";

export function useStats() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["room", "stats"],
    queryFn: roomService.getStats,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
