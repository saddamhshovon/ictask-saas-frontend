"use client";
import { get, post } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditItem() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  async function getItem() {
    const itemResponse = await get(`items/${id}`);
    setItem(itemResponse.data.data);
  }

  useEffect(() => {
    getItem();
  });

  async function handleEditItem(event) {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const description = event.target.description.value.trim();
    const image = event.target.image?.files[0] ?? null;
    const quantity = event.target.quantity.value.trim();

    console.log(name, description, image, quantity);

    try {
      const editItemResponse = await post(
        `items/${id}`,
        {
          _method: "PUT",
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
      // console.log(editItemResponse.data.message);
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
      <form onSubmit={handleEditItem} className="flex flex-col gap-2">
        <label htmlFor="name">Enter item name.</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={item?.name}
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
        />
        <label htmlFor="description">Enter item description.</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
          defaultValue={item?.description}
        ></textarea>
        <label htmlFor="image">
          Upload Image.(Image size should be 500X500 and Under 1MB)
        </label>

        <input
          type="file"
          name="image"
          id="image"
          className="border border-[#ADADAD] mb-3 px-[15px] py-[9px] rounded-[9px]
        focus:border-[#4285F4] outline-none"
        />
        <label htmlFor="quantity">Enter quantity.</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          className="border border-[#ADADAD] px-[15px] py-[9px] rounded-[9px] focus:border-[#4285F4] outline-none"
          defaultValue={item?.quantity}
        />
        <input
          type="submit"
          value="Change"
          className="w-full cursor-pointer text-white font-semibold text-2xl mt-[20px] py-2 bg-[#7DA814] transition-transform active:scale-95"
        />
      </form>
    </>
  );
}
