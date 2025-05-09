import WelcomePage from "@/components/modules/dashboard/content/DashboardOverviewPage";
import { Hourglass, Send } from "lucide-react";
import React from "react";

const TenantDashboard = () => {
 const content = {
    title: "Welcome to Your Dashboard",
    description:
      "Submit requests, track their status, and manage your profile.",
    actions: [
      {
        icon: <Send />,
        title: "Submit Request",
        description: "Submit a new maintenance or service request."
      },
      {
        icon: <Hourglass  />,
        title: "Track Requests",
        description: "View the status of your submitted requests."
      },
    ],
  };

  return (
    <div>
      <WelcomePage content={content} />
    </div>
  );
};

export default TenantDashboard;
