import { useGetProfileBySlugQuery } from "@/redux/features/auth/auth.Api";
import { useAppSelector } from "@/redux/hooks";

export function useUser() {
  const user = useAppSelector((state) => state.auth.user);
  const slug = user?.slug ?? "";

  const { data, isLoading:userComing, isError, error, refetch } = useGetProfileBySlugQuery(
    slug,
    {
      skip: !slug,
    }
  );

  const userInfo = data?.data ?? null;

  return {
    user,
    userInfo,
    userComing,
    isError,
    error,
    refetch,
  };
}
