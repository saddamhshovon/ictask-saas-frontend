"use client";
import DeleteModal from "@/components/DeleteModal";
import { get } from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState({
    status: false,
    url: "",
    response: null,
  });

  async function getInventory() {
    try {
      const inventoryResponse = await get(`inventories`);
      setInventory(inventoryResponse.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setInventory(null);
      }
    }
  }

  useEffect(() => {
    getInventory();
  }, [deleteModalData.response]);

  return (
    <>
      {inventory ? (
        <>
          <div className="flex items-center justify-between h-full border border-collapse border-gray-300 rounded-md ">
            <ul className="overflow-auto flex-1">
              <li className="flex">
                <span className="w-1/4 bg-gray-200 p-2 font-semibold">
                  Name:
                </span>
                <span className="flex-1 p-2">{inventory?.name}</span>
              </li>
              <li className="flex">
                <span className="w-1/4 bg-gray-200 p-2 font-semibold">
                  Description:
                </span>
                <span className="flex-1 p-2">{inventory?.description}</span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-3 pr-3 text-center">
              <Link
                href={"/inventory/edit"}
                className="px-5 py-1 font-semibold text-white bg-blue-600 rounded-md"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  setDeleteModalData({ status: true, url: `/inventories` });
                }}
                className="px-5 py-1 font-semibold text-white bg-red-600 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-end">
            <Link
              href={"/inventory/create"}
              className="bg-blue-600 flex align-middle justify-center h-11 w-24 rounded-md text-white font-semibold cursor-pointer"
            >
              <p className="mt-2">Create</p>
            </Link>
          </div>
          <p>You don&apos;t have any inventory.</p>
        </>
      )}
      <DeleteModal
        data={deleteModalData}
        setData={setDeleteModalData}
        message={`Are you sure?`}
      />
    </>
  );
}
