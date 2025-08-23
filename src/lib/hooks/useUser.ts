import { useGetProfileBySlugQuery } from "@/redux/features/auth/auth.Api";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUserProfile } from "@/Types/UserType";

export function useUser() {
  const user: TUser | null = useAppSelector((state) => state.auth.user);
  const slug = user?.slug ?? "";

  const {
    data,
    isLoading: userComing,
    isError,
    error,
    refetch,
  } = useGetProfileBySlugQuery(slug, {
    skip: !slug,
  });

  const userInfo: TUserProfile = data?.data ?? null;

  return {
    user,
    userInfo,
    userComing,
    isError,
    error,
    refetch,
  };
}
