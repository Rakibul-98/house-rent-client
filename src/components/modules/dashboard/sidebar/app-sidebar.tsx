"use client";

import * as React from "react";
import {
  Building,
  GitPullRequestArrow,
  MapPinHouse,
  Settings,
  SquareTerminal,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/${user?.role}/dashboard`,
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Requests",
        url: `/${user?.role}/requests`,
        icon: GitPullRequestArrow,
      },
      ...(user?.role !== "tenant"
        ? [
            {
              title: "Listings",
              url: `/${user?.role}/listing`,
              icon: Building,
              items: [
                ...(user?.role === "owner"
                  ? [
                      {
                        title: "Create Listing",
                        url: `/${user?.role}/listing/create-listing`,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
      ...(user?.role === "admin"
        ? [
            {
              title: "Users",
              url: `/${user?.role}/users`,
              icon: User,
            },
          ]
        : []),
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "Profile",
            url: "/user-profile",
          },
        ],
      },
    ]
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                <MapPinHouse className="size-8 text-blue-500 " />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">House Rent</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
