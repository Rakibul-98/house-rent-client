"use server"

import AllUsersPage from "@/components/modules/users/AllUsersPage";
import { getAllUsers } from "@/services/Users";
import React from "react";

const page = async () => {
  const users = await getAllUsers();
  if (!users?.data) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <AllUsersPage data={users?.data} />
    </div>
  );
};

export default page;
