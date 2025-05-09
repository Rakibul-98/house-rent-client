import TenantOverview from "@/components/modules/dashboard/content/TenantOverview";
import { getAllRequests } from "@/services/request";
import React from "react";

const TenantDashboard = async () => {
  const {data:requests} = await getAllRequests(undefined);   

  return (
    <div>
      <TenantOverview requests={requests?.result || []} />
    </div>
  );
};

export default TenantDashboard;
