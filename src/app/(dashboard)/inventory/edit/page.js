"use client";
import { get, post } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateInventory() {
  const router = useRouter();

  const [inventory, setInventory] = useState(null);
  const [error, setError] = useState(null);

  async function getInventory() {
    const inventoryResponse = await get(`inventories`);
    setInventory(inventoryResponse.data.data);
  }

  useEffect(() => {
    getInventory();
  }, []);

  async function handleCreateInventory(event) {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();

    try {
      const createInventoryResponse = await post("inventories", {
        _method: "PUT",
        name,
        description,
      });
      // console.log(createInventoryResponse.data.message);
      router.push("/inventory");
    } catch (error) {
      // if (error.response.status === 409) {
      //   console.log("Exists");
      // }
      setError(error?.response?.data?.message);
      console.log(error);
    }
  }

  return (
    <>
      {error && (
        <>
          <p className="text-red-600 mb-2">* {error}</p>
        </>
      )}
      <form onSubmit={handleCreateInventory} className="flex flex-col gap-5">
        <label htmlFor="name">Enter inventory name.</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Inventory Name"
          defaultValue={inventory?.name}
          className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        />
        <label htmlFor="description">Enter inventory description.</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          placeholder="Inventory description."
          defaultValue={inventory?.description}
          className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        ></textarea>
        <input
          type="submit"
          value="Change"
          className="w-full cursor-pointer text-white font-semibold text-2xl mt-[20px] py-2 bg-[#7DA814] transition-transform active:scale-95"
        />
      </form>
    </>
  );
}
