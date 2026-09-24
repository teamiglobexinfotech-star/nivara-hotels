import { useQuery } from "@tanstack/react-query";

import { maintenanceKeys } from "../maintenance.keys";
import { maintenanceService } from "../maintenance.service";

export function useReportKpi() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: maintenanceKeys.lists(),
    queryFn: maintenanceService.getStats,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
