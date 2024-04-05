import { useRouter } from "next/navigation";
import React from "react";

export default function ItemRowActions({ id, setDeleteModalData }) {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-3 justify-between font-semibold text-white">
        <button
          onClick={() => router.push(`/items/${id}`)}
          className="py-1 w-16 bg-green-700 rounded-md"
        >
          View
        </button>
        <button
          onClick={() => router.push(`/items/${id}/edit`)}
          className="py-1 w-16 bg-blue-600 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setDeleteModalData({ status: true, url: `/items/${id}` });
          }}
          className="py-1 w-16 bg-red-600 rounded-md"
        >
          Delete
        </button>
      </div>
    </>
  );
}
