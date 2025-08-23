"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import Loader from "./Loader";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, userComing } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!userComing && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, userComing, router, pathname]);

  if (userComing || (!userComing && !user)) {
    return <Loader />;
  }

  return <>{children}</>;
}
