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
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/hf logo.png";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Browse Listings", path: "/listings" },
    { name: "Location", path: "/location" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Terms", path: "/terms" },
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

  const handleLogOut = () => {
    logout();
    toast.success("Logout successful!!");
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="bg-[#5274b8] w-full">
      <div className="w-[90%] flex justify-between items-center mx-auto py-2">
        <Link href="/">
          <Image src={logo} alt="Modern Apartment" className="h-14 w-auto" />
        </Link>

        <nav className="hidden md:flex space-x-6 text-white">
          {links.map(({ name, path }) => {
            const isActive = pathname === path;
            return name === "Location" ? (
              <DropdownMenu key={name}>
                <DropdownMenuTrigger
                  className={`px-1 hover:border-b-2 focus:outline-none ${
                    isActive && "text-black border-b-2 font-semibold"
                  }`}
                >
                  {name}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="grid grid-cols-3 gap-6 p-4 w-auto bg-gray-100">
                  {divisions.map(({ name, cities }) => (
                    <div key={name}>
                      <DropdownMenuLabel className="text-lg border-b-2 border-[#5274b8] w-fit pb-0 mb-1">
                        {name}
                      </DropdownMenuLabel>
                      {cities.map((city) => (
                        <DropdownMenuItem key={city}>
                          <Link
                            href={`/listings?location=${name.toLowerCase()}&city=${city.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {city}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={name}
                className={`px-1 hover:border-b-2 ${
                  isActive && "text-black border-b-2 font-semibold"
                }`}
                href={path}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <nav className="hidden md:flex gap-2 items-center font-bold">
          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none h-10 w-10 cursor-pointer rounded-full border-2">
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
                  <LogOut className="text-white group-hover:text-black mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-sm cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer text-white" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#5274b8] w-72 py-5 text-white"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                {links.map(({ name, path }) =>
                  name === "Location" ? (
                    <DropdownMenu key={name}>
                      <DropdownMenuTrigger className="text-sm cursor-pointer font-medium border-b py-1 w-full text-center">
                        {name}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64 p-2 grid grid-cols-2 gap-4">
                        {divisions.map(({ name, cities }) => (
                          <div key={name}>
                            <DropdownMenuLabel className="text-lg border-b-2 border-[#5274b8] w-fit pb-0 mb-1">
                              {name}
                            </DropdownMenuLabel>
                            {cities.map((city) => (
                              <DropdownMenuItem key={city}>
                                <Link
                                  href={`/listings?location=${name.toLowerCase()}&city=${city.toLowerCase()}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {city}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      key={name}
                      href={path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-medium border-b w-full py-1 ${
                        pathname === path
                          ? "text-black font-semibold cursor-default"
                          : ""
                      }`}
                    >
                      {name}
                    </Link>
                  )
                )}

                {user?.email ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="mt-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.profile_image} />
                        <AvatarFallback>
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
                        <LogOut className="text-white group-hover:text-black mr-2" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="mt-4 w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
