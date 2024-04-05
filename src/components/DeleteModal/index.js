import { del } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React from "react";

function DeleteModal({ data = { status: false, url: "" }, setData, message }) {
  const router = useRouter();

  async function handleConfirm() {
    try {
      const deleteResponse = await del(data.url);
      if (deleteResponse.status === 204) {
        setData((prev) => {
          return { ...prev, status: false, response: 204 };
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {data.status && <div className="overlay"></div>}
      <dialog
        open={data.status}
        className="bg-[#ffffffd3] border-2 border-[#7DA814] h-40 w-[300px] rounded-md px-9 fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="">
          <p className="py-10 text-center font-semibold text-black">
            {message}
          </p>
        </div>
        <div
          className="flex justify-between font-semibold  gap-4
      "
        >
          <button
            onClick={() =>
              setData((prev) => {
                return { ...prev, status: false };
              })
            }
            className="h-10 text-white w-24 bg-blue-600 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="h-10 text-white w-24 bg-red-600 rounded-md"
          >
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
}

export default DeleteModal;
