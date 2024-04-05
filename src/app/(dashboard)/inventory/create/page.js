"use client";
import { post } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateInventory() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleCreateInventory(event) {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();

    console.log(name, description);

    try {
      const createInventoryResponse = await post("inventories", {
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
      <form onSubmit={handleCreateInventory} className="flex flex-col gap-2">
        <label htmlFor="name">Enter inventory name.</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Inventory Name"
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        />
        <label htmlFor="description">Enter inventory description.</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          placeholder="Inventory description."
          className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        ></textarea>
        <input
          type="submit"
          value="Create"
          className="w-full cursor-pointer text-white font-semibold text-2xl mt-[20px] py-2 bg-[#7DA814] transition-transform active:scale-95"
        />
      </form>
    </>
  );
}
