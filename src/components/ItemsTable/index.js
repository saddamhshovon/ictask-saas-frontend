import React, { Fragment } from "react";
import ItemRow from "./ItemRow";

export default function ItemsTable({
  items = null,
  total = 0,
  setDeleteModalData,
}) {
  return (
    <table className="w-full text-sm text-center  border-2 rounded-lg">
      <thead className="text-sm uppercase bg-[#7DA814] text-white">
        <tr>
          <th className="px-6 py-3 border-2">ID</th>
          <th className="px-6 py-3 border-2">Name</th>
          <th className="px-6 py-3 border-2">Description</th>
          <th className="px-6 py-3 border-2">quantity</th>
          <th className="px-6 py-3 border-2">Image</th>
          <th className="px-6 py-3 border-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items ? (
          items.map((item) => {
            return (
              <ItemRow
                key={item.id}
                item={item}
                setDeleteModalData={setDeleteModalData}
              />
            );
          })
        ) : (
          <tr className="text-black">
            <td colSpan={6} className="px-6 py-3 border-2">
              No Items...
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr className="text-black">
          <td className="px-6 py-3" colSpan={6}>
            Total: {total}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
