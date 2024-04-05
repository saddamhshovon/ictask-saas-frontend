"use client";
import { post } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateItem() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleCreateItem(event) {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();
    const image = event.target.image.files[0];
    const quantity = event.target.quantity.value.trim();

    console.log(name, description, image, quantity);

    try {
      const createItemResponse = await post(
        "items",
        {
          name,
          description,
          image,
          quantity,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(createItemResponse.data.message);
      router.push("/items");
    } catch (error) {
      // if (error?.response?.status === 422) {
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
      <form onSubmit={handleCreateItem} className="flex flex-col gap-2 mb-10">
        <label htmlFor="name">Enter item name.</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter item name"
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        />
        <label htmlFor="description">Enter item description.</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          placeholder="Enter item description."
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        ></textarea>
        <label htmlFor="image">
          Upload Image.( Image size should be 500X500 and Under 1MB )
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        />
        <label htmlFor="quantity">Enter quantity.</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Enter item quantity."
          className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        />
        <input
          type="submit"
          value="Create"
          className="w-full cursor-pointer text-white font-semibold text-2xl mt-[20px] py-2 bg-[#7DA814] transition-transform active:scale-95"
        />
      </form>
    </>
  );
}
