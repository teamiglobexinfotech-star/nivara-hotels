import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/shared.types";

import { customerKeys } from "../customer.keys";
import { customerService } from "../customer.service";

export function useCustomerList(params: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customerKeys.list(params),
    queryFn: () => customerService.getAll(params),
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
