import { useQuery } from "@tanstack/react-query";

import { maintenanceKeys } from "../maintenance.keys";
import { maintenanceService } from "../maintenance.service";

export function useHousekeeperList(query?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: maintenanceKeys.housekeepers(query),
    queryFn: () => maintenanceService.getHousekeepers(query),
    placeholderData: (previousData) => previousData,
  });

  return {
    housekeepers: data || [],
    isLoading,
    isError,
    refetch,
  };
}
