import { useQuery } from "@tanstack/react-query";

import { staffKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useStaff(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: staffKeys.detail(id),
    queryFn: () => staffService.getById(id),
    enabled: !!id,
  });

  return {
    staffDetails: data,
    isLoading,
    isError,
    refetch,
  };
}
