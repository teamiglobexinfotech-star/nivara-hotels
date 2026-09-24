import { useQuery } from "@tanstack/react-query";

import { maintenanceKeys } from "../maintenance.keys";
import { maintenanceService } from "../maintenance.service";

export function useReport(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: maintenanceKeys.detail(id),
    queryFn: () => maintenanceService.getById(id),
    enabled: !!id,
  });

  return {
    report: data,
    isLoading,
    isError,
    refetch,
  };
}
