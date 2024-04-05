"use client";
import Link from "next/link";
import React from "react";
import Logout from "../Logout";

export default function Navbar() {
  return (
    <nav className="h-16 w-full flex px-10 border-b-2 bg-[#7ea8143b]">
      <div className="h-full w-[20%] flex items-center">
        <p className="text-2xl font-bold text-[#7DA814] ">SAAS Company</p>
      </div>
      <div className="h-full w-[80%] flex justify-between items-center text-white font-semibold">
        <ul className="flex gap-6">
          <li>
            <Link
              href={"/"}
              className="py-3 px-10 text-center bg-[#7DA814] rounded-md transition-transform active:scale-95 cursor-pointer"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={"/inventory"}
              className="py-3 px-10 text-center bg-[#7DA814] rounded-md transition-transform active:scale-95 cursor-pointer"
            >
              Inventory
            </Link>
          </li>
          <li>
            <Link
              href={"/items"}
              className="py-3 px-10 text-center bg-[#7DA814] rounded-md transition-transform active:scale-95 cursor-pointer"
            >
              Items
            </Link>
          </li>
        </ul>
        <ul className="flex gap-2">
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
}
