import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/shared.types";

import { roomKeys } from "../room.keys";
import { roomService } from "../room.service";

export function useRoomList(params?: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomKeys.list(params),
    queryFn: () => roomService.getRooms(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data?.data ?? [],
    pagination: data?.meta,
    isLoading,
    isError,
    refetch,
  };
}
