"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constant/routes";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
// import { Input } from "../ui/input";
// import { useState } from "react";
// import { getSearchResult } from "@/services/Listing";
import Image from "next/image";
import logo from "../../assets/hf logo.png";
import React from "react";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  // const [searchTerm, setSearchTerm] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Home", path: "/" },
    { name: "Browse Listings", path: "/listings" },
    { name: "Location", path: "/location" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
  ];

  const divisions = [
    {
      name: "Dhaka",
      cities: ["Dhaka", "Gazipur", "Narayanganj"],
    },
    {
      name: "Chattogram",
      cities: ["Chattogram", "Cox's Bazar", "Comilla"],
    },
    {
      name: "Rajshahi",
      cities: ["Rajshahi", "Bogra", "Naogaon"],
    },
    {
      name: "Barishal",
      cities: ["Barishal", "Bhola", "Patuakhali"],
    },
    {
      name: "Sylhet",
      cities: ["Sylhet", "Moulvibazar", "Habiganj"],
    },
  ];

  // const handleSearch = async () => {
  //   const { data: searchResult } = await getSearchResult(searchTerm);
  //   if (searchResult.totalData < 1) {
  //     toast.error("No listing found!! Try another one...");
  //     setSearchTerm("");
  //   }
  //   const searchId = searchResult?.result[0]._id;
  //   router.push(`/listing-details/${searchId}`);
  //   setSearchTerm("");
  // };

  const handleLogOut = () => {
    logout();
    toast.success("Logout successful!!");
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="bg-[#5274b8]">
      <div className="w-[90%] flex justify-between gap-3 items-center mx-auto py-2 ">
        <Link href="/">
          <Image src={logo} alt="Modern Apartment" className="h-14 w-auto" />
        </Link>
        <nav className="space-x-4 text-white">
          {links.map(({ name, path }) => {
            const isActive = pathname === path;
            return name === "Location" ? (
              <React.Fragment key={name}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`px-1 border-black hover:border-b-3 focus:outline-none focus-visible:ring-0 focus-visible:outline-none ${
                      isActive && "text-black border-b-3 font-medium"
                    }`}
                  >
                    {name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="grid grid-cols-3 gap-6 p-4 w-auto bg-gray-100">
                    {divisions.map(({ name, cities }) => (
                      <div key={name}>
                        <DropdownMenuLabel className="text-lg border-b-3 border-[#5274b8] w-fit pb-0 mb-1">
                          {name}
                        </DropdownMenuLabel>
                        {cities.map((city) => (
                          <DropdownMenuItem key={city}>
                            <Link
                              href={`/location/${name.toLowerCase()}/${city
                                .toLowerCase()
                                .replace(/[\s']/g, "-")}`}
                            >
                              {city}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </React.Fragment>
            ) : (
              <Link
                key={name}
                className={`px-1 border-black hover:border-b-3 ${
                  isActive && "text-black border-b-3 font-medium"
                }`}
                href={path}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        {/* <div className="flex justify-center text-white">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-auto sm:w-96 text-xs placeholder:text-white/80 rounded-e-none"
              placeholder="Search Your Rental..."
            />
            <Button
              size="sm"
              disabled={!searchTerm}
              className="cursor-pointer bg-primary/70 hover:bg-primary rounded-s-none border border-s-0"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div> */}
        <nav className="flex gap-2 items-center font-bold">
          {user?.email ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none h-10 w-10 cursor-pointer rounded-full border-3">
                  <Avatar className="w-full h-full p-1">
                    <AvatarImage src={user?.profile_image} />
                    <AvatarFallback className="font-semibold text-xl">
                      {user.user_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/user-profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer text-white group"
                    onClick={handleLogOut}
                  >
                    <LogOut className="text-white group-hover:text-black" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-sm cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
