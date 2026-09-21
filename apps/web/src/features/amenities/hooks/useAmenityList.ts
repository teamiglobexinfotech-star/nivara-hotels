import { useQuery } from "@tanstack/react-query";

import { amenityKeys } from "../amenity.keys";
import { amenityService } from "../amenity.service";

export function useAmenityList() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: amenityKeys.list(),
    queryFn: () => amenityService.getAll(),
  });

  return {
    items: data ?? [],
    isLoading,
    isError,
    refetch,
  };
}
