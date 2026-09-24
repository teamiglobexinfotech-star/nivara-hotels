import { useQuery } from "@tanstack/react-query";

import { customerKeys } from "../customer.keys";
import { customerService } from "../customer.service";

export function useCustomerKpi() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customerKeys.lists(),
    queryFn: customerService.getStats,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
