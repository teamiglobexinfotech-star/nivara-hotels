import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/shared.types";

import { roomService } from "../room.service";

export function useRooms(params?: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["room", "rooms", params],
    queryFn: () => roomService.getRooms(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data?.items ?? [],
    pagination: data?.pagination || data?.meta,
    isLoading,
    isError,
    refetch,
  };
}
