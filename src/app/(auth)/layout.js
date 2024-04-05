"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    let auth = false;
    if (typeof window !== "undefined") {
      auth = window.localStorage?.getItem("token") ? true : false;
    }
    if (auth) router.back();
  });

  return <>{children}</>;
}
