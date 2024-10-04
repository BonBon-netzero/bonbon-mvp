"use client";
import { ReactNode } from "react";
import { useAccount } from "wagmi";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export default function PrivateRoute({ children }: { children: any }) {
  const account = useAccount();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (!account.isConnected) {
    const url = `${pathname}/${searchParams.toString()}`;
    redirect(`/login`);
  }
  return children;
}
