import { useGetProfileQuery } from "@/redux/features/auth/auth.Api";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUserProfile } from "@/Types/UserType";

export function useUser() {
  const user: TUser | null = useAppSelector((state) => state.auth.user);
  const id = user?.id ?? "";

  const {
    data,
    isLoading: userComing,
    isError,
    error,
    refetch,
  } = useGetProfileQuery(id, {
    skip: !id,
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
