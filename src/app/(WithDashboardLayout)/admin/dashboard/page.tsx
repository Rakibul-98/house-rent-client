import AdminOverview from "@/components/modules/dashboard/content/AdminOverview";
import { getAllListing } from "@/services/Listing";
import { getAllRequests } from "@/services/request";
import { getAllUsers } from "@/services/Users";
import React from "react";

const AdminDashboard = async () => {
  const { data: requests } = await getAllRequests(undefined);
  const { data: listings } = await getAllListing(undefined);
  const { data: users } = await getAllUsers();

  return (
    <div>
      <title>Dashboard - Admin</title>
      <AdminOverview
        users={users || []}
        requests={requests?.result || []}
        listings={listings?.result || []}
      />
    </div>
  );
};

export default AdminDashboard;
