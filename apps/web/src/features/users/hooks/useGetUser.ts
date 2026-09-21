import { useQuery } from "@tanstack/react-query";

import { userService } from "../user.service";

export function useGetUser() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users", "get"],
    queryFn: userService.getById,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
