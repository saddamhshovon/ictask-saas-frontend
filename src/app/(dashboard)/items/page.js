"use client";
import DeleteModal from "@/components/DeleteModal";
import ItemsTable from "@/components/ItemsTable";
import { get } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const defaultPagination = {
  perPage: 10,
  page: 1,
};

function buildQuery(search, pagination) {
  let query = "";
  query =
    search && search.length
      ? `?search=${search}&per_page=${pagination.perPage}`
      : `?per_page=${pagination.perPage}&page=${pagination.page}`;
  return query;
}

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(null);
  const [pagination, setPagination] = useState(defaultPagination);
  const [deleteModalData, setDeleteModalData] = useState({
    status: false,
    url: "",
    response: null,
  });

  async function getItems(query) {
    try {
      const itemsResponse = await get("items" + query);
      setItems(itemsResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const search = event.target.search.value.trim();
    setSearch(search);
  }

  useEffect(() => {
    getItems(buildQuery(search, pagination));
  }, [search, pagination, deleteModalData.response]);

  return (
    <>
      <div className="flex gap-2 justify-between pb-4">
        <form onSubmit={handleSearch}>
          <label htmlFor="search"></label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter keyword"
            className="h-11 px-5 rounded-md font-semibold mr-4 border border-[#ADADAD] focus:border-[#4285F4] outline-none"
            autoComplete="off"
          />
          <input
            type="submit"
            value="Search"
            className="bg-blue-600 h-11 px-5 rounded-md text-white font-semibold cursor-pointer"
          />
        </form>
        <div className="">
          <label htmlFor="per_page" className="font-semibold mr-5">
            Show
          </label>
          <select
            name="per_page"
            id="per_page"
            value={pagination.perPage}
            onChange={(event) =>
              setPagination((prev) => ({
                ...prev,
                perPage: event.target.value,
              }))
            }
            className="h-11 px-5 rounded-md"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="">
          <Link
            href={"/items/create"}
            className="bg-blue-600 flex align-middle justify-center h-11 w-24 rounded-md text-white font-semibold cursor-pointer"
          >
            <p className="mt-2">Create</p>
          </Link>
        </div>
      </div>
      <ItemsTable
        items={items.data}
        total={items.meta?.total}
        setDeleteModalData={setDeleteModalData}
      />
      <DeleteModal
        data={deleteModalData}
        setData={setDeleteModalData}
        message={`Are you sure?`}
      />
    </>
  );
}
