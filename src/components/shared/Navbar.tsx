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
import { LogOut, MapPinHouse } from "lucide-react";

export default function Navbar() {
  const { user, setIsLoading } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    toast.success("Logout successful!!")
    setIsLoading(true);
    if(protectedRoutes.some((route)=> pathname.match(route))){
      router.push('/');
    }
  };

  return (
    <header className="bg-sky-50 w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <Link href="/">
          <h1 className="text-2xl flex items-center">
            <MapPinHouse className="size-9 text-blue-500 "/>
            House Finder
          </h1>
        </Link>
        <nav className="flex gap-2 items-center font-bold">
          {user?.email ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer rounded-full border-3 border-green-500">
                  <Avatar >
                    <AvatarImage src={user.profile_image} />
                    <AvatarFallback className="font-semibold text-xl bg-green-50">
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
              <Button className="rounded-sm cursor-pointer">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
