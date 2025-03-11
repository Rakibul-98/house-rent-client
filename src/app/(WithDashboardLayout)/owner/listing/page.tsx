"use server";

import { getAllListing } from "@/services/Listing";
import AllListingPage from "./listings/AllListingPage";

const OwnerListingDashboard = async ({searchParams}:{searchParams: Promise<{page: string}>}) => {
  const {page} = await searchParams;
  const { data } = await getAllListing(page);

  return (
    <div>
      <title>Dashboard - Owner</title>
      <AllListingPage data={data?.result} />
    </div>
  );
};

export default OwnerListingDashboard;
