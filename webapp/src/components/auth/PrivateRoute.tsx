"use client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/hooks/store/useAuth";

export default function PrivateRoute({ children }: { children: any }) {
  const { redirectLoginPage, isAuthenticated } = useAuthContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (redirectLoginPage && !isAuthenticated) {
    const url = `${pathname}/${searchParams.toString()}`;
    redirect(`/login`);
  }
  return children;
}
