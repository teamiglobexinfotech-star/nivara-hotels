import { useQuery } from "@tanstack/react-query";
import { userService } from "../user.service";

export function useProfile() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => userService.getProfile(),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
