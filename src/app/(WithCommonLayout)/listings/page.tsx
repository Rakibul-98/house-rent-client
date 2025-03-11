import AllListings from "@/components/modules/listings/all-listings/AllListings";
import TablePagination from "@/components/ui/core/HRTable/TablePagination";
import { getAllListing } from "@/services/Listing";
import React from "react";

const ListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await getAllListing(page);
  const numOfPage = Math.ceil((data?.totalData)/9);

  return (
    <div>
      <title>Listings - House Finder</title>
      <AllListings data={data?.result} />
      <TablePagination totalPage={numOfPage} />
    </div>
  );
};

export default ListingsPage;
