import { useQuery } from "@tanstack/react-query";

import { customerKeys } from "@/features/customers/customer.keys";

import { customerService } from "../customer.service";

export function useSearchCustomers(search?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customerKeys.search(search),
    queryFn: () => customerService.search(search),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data ?? [],
    isLoading,
    isError,
    refetch,
  };
}
