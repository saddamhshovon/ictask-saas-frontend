import React from "react";
import ItemRowActions from "./ItemRowActions";
import Image from "next/image";

export default function ItemRow({ item, setDeleteModalData }) {
  return (
    <>
      <tr
        key={item.id}
        className="odd:bg-white even:bg-[#dee2ea] border-2 text-black"
      >
        <td className="px-6 py-3 border-2">{item.id}</td>
        <td className="px-6 py-3 border-2">{item.name}</td>
        <td className="px-6 py-3 border-2">{item.description}</td>
        <td className="px-6 py-3 border-2">{item.quantity}</td>
        <td className="px-6 py-3 border-2">
          <Image
            src={item.image}
            height={20}
            width={20}
            alt={item.name}
            loading="lazy"
          />
        </td>
        <td className="px-6 py-3 border-2 w-[20%]">
          <ItemRowActions
            id={item.id}
            setDeleteModalData={setDeleteModalData}
          />
        </td>
      </tr>
    </>
  );
}
