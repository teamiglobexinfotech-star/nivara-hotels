import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/shared.types";

import { customerService } from "../customer.service";

export function useCustomers(params: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["customers", "customers", params],
    queryFn: () => customerService.getCustomers(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data?.items ?? [],
    pagination: data?.pagination || data?.meta,
    isLoading,
    isError,
    refetch,
  };
}
