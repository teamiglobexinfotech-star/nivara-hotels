import { useQuery } from "@tanstack/react-query";

import { roomKeys } from "../room.keys";
import { roomService } from "../room.service";

export function useRoom(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => roomService.getById(id),
    enabled: !!id,
  });

  return {
    room: data,
    isLoading,
    isError,
    refetch,
  };
}
