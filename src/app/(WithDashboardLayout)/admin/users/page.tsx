"use server"

import AllUsersPage from "@/components/modules/users/AllUsersPage";
import { getAllUsers } from "@/services/Users";
import React from "react";

const UsersDashboard = async () => {
  const users = await getAllUsers();

  return (
    <div>
      <AllUsersPage data={users.data} />
    </div>
  );
};

export default UsersDashboard;
