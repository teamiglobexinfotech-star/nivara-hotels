import { useQuery } from "@tanstack/react-query";

import { roomTypeKeys } from "../roomType.keys";
import { roomTypeService } from "../roomType.service";

export function useRoomTypeList() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomTypeKeys.list(),
    queryFn: roomTypeService.getAll,
  });

  return {
    items: data ?? [],
    isLoading,
    isError,
    refetch,
  };
}
