import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/shared.types";

import { maintenanceKeys } from "../maintenance.keys";
import { maintenanceService } from "../maintenance.service";

export function useReportList(params?: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: maintenanceKeys.list(params),
    queryFn: () => maintenanceService.getAll(params),
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
