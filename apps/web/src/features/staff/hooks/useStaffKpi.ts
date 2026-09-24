import { useQuery } from "@tanstack/react-query";

import { staffKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useStaffKpi() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: staffKeys.lists(),
    queryFn: staffService.getStats,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
