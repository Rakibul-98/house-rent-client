"use server";

import { getAllListing } from "@/services/Listing";
import AllListingPage from "./listings/AllListingPage";

const AdminListingDashboard = async ({searchParams}:{searchParams: Promise<{page: string}>}) => {
  const {page} = await searchParams;
  const { data } = await getAllListing(page);

  return (
    <div>
      <title>Dashboard - Admin</title>
      <AllListingPage data={data?.result} totalData={data?.totalData} />
    </div>
  );
};

export default AdminListingDashboard;
