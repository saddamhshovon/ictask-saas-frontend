"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    let auth = false;
    if (typeof window !== "undefined") {
      auth = window.localStorage?.getItem("token") ? true : false;
    }
    if (!auth) router.push("/login");
  });

  return (
    <>
      <Navbar />
      <div className="px-60 mt-10">{children}</div>
    </>
  );
}
