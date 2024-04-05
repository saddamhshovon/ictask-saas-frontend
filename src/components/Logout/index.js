"use client";
import { post } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logout() {
  const router = useRouter();
  async function handleLogout(event) {
    event.preventDefault();
    try {
      const logoutResponse = await post("logout");
      console.log(logoutResponse);
      if (logoutResponse.status === 200) {
        window.localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleLogout}>
      <input
        type="submit"
        value="Logout"
        className="w-32 py-2 text-center bg-[#7DA814] rounded-md transition-transform active:scale-95 cursor-pointer"
      />
    </form>
  );
}
