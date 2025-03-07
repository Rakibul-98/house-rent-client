"use client"

import { useUser } from "@/context/UserContext";

const HomePage = () => {

  const {user:loggedInUser} = useUser();
  console.log(loggedInUser);
  return (
    <div>
    </div>
  );
};

export default HomePage;
