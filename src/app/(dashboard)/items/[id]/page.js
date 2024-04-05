"use client";
import { get } from "@/lib/axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  async function getItem() {
    const itemResponse = await get(`items/${id}`);
    setItem(itemResponse.data.data);
  }

  useEffect(() => {
    getItem();
  });

  return (
    <>
      {item ? (
        <>
          <div className="mb-2 flex justify-end">
            <Link
              href={"/items/" + item?.id + "/edit"}
              className="bg-blue-600 w-32 flex align-middle justify-center h-11 rounded-md text-white font-semibold cursor-pointer"
            >
              <p className="mt-2">Edit</p>
            </Link>
          </div>
          <div className="flex items-center justify-between h-full border border-collapse border-gray-300 rounded-md ">
            <ul className="overflow-auto flex-1">
              <li className="flex">
                <span className="w-1/4 bg-gray-200 p-2 font-semibold">ID:</span>
                <span className="flex-1 p-2">{item?.id}</span>
              </li>
              <li className="flex">
                <span className="w-1/4 bg-gray-200 p-2 font-semibold">
                  Name:
                </span>
                <span className="flex-1 p-2">{item?.name}</span>
              </li>
              <li className="flex">
                <span className="w-1/4 bg-gray-200 p-2 font-semibold">
                  Description:
                </span>
                <span className="flex-1 p-2">{item?.description}</span>
              </li>
              <li className="flex">
                <span className="w-1/4 bg-gray-200 p-2 font-semibold">
                  Quantity:
                </span>
                <span className="flex-1 p-2">{item?.quantity}</span>
              </li>
            </ul>
            <div className="flex justify-start">
              <Image
                src={item?.image}
                width={160}
                height={160}
                alt={item?.name}
                loading="lazy"
                className="rounded-md"
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
