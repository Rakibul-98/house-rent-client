import WelcomePage from "@/components/modules/dashboard/content/WelcomePage";
import { Settings, User } from "lucide-react";
import React from "react";

export default function AdminHomePage() {
  const content = {
    title: "Admin Dashboard",
    description:
      "Manage users, requests, and system settings. Ensure smooth operations.",
    actions: [
      {
        icon: <User />,
        title: "Manage Users",
        description: "View and manage all users in the system."
      },
      {
        icon: <Settings />,
        title: "System Settings",
        description: "Configure system-wide settings and preferences."
      },
    ],
  };

  return (
    <div>
      <WelcomePage content={content} />
    </div>
  );
}
