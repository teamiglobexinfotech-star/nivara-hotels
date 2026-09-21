import { useQuery } from "@tanstack/react-query";

import { customerService } from "../customer.service";

export function useCustomerById(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["customer", "getCustomerById", id],
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
