"use client";

import { Badge } from "@/components/ui/badge";
import { HRTable } from "@/components/ui/core/HRTable";
import { listingType, requestType, userType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface AdminOverviewProps {
  users: userType[];
  requests: requestType[];
  listings: listingType[];
}

export default function AdminOverview({
  users,
  requests,
  listings,
}: AdminOverviewProps) {

  const latestListings = [...listings]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 1998).getTime() -
        new Date(a.createdAt ?? 1998).getTime()
    )
    .slice(0, 3);

  const latestRequests = [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 1998).getTime() -
        new Date(a.createdAt ?? 1998).getTime()
    )
    .slice(0, 3);

  const latestUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 1998).getTime() -
        new Date(a.createdAt ?? 1998).getTime()
    )
    .slice(0, 3);

  const listingColumns: ColumnDef<listingType>[] = [
    {
      accessorKey: "propertyTitle",
      header: "Title",
    },
    {
      accessorKey: "houseType",
      header: "Type",
    },
    {
      accessorKey: "rentalHouseLocation",
      header: "Location",
    },
    {
      accessorKey: "numberOfBedrooms",
      header: () => <div className="flex justify-center">No of Bedrooms</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.numberOfBedrooms}
        </div>
      ),
    },
    {
      accessorKey: "rentAmount",
      header: "Rent",
    },
  ];

  const requestColumns: ColumnDef<requestType>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "tenant.user_name",
      header: "Request By",
    },
    {
      accessorKey: "listing.propertyTitle",
      header: "Rental",
    },
    {
      accessorKey: "listing.rentalHouseLocation",
      header: "Location",
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => (
        <span
          className={`
                ${row.original.paymentStatus === "inactive" && "bg-red-500"}
                  ${row.original.paymentStatus === "paid" && "bg-green-500"} 
                ${row.original.paymentStatus === "active" && "bg-amber-300"}  
                 px-3 py-1 text-white uppercase rounded-sm
                `}
        >
          {row.original.paymentStatus}
        </span>
      ),
    },
    {
      accessorKey: "requestStatus",
      header: "Req. Status",
      cell: ({ row }) => (
        <span
          className={`
              ${row.original.requestStatus === "pending" && "bg-amber-300"}  
              ${row.original.requestStatus === "approved" && "bg-green-500"} 
              ${
                row.original.requestStatus === "rejected" && "bg-red-500"
              } px-3 py-1 text-white uppercase rounded-sm
              `}
        >
          {row.original.requestStatus}
        </span>
      ),
    },
  ];

  const userColumns: ColumnDef<userType>[] = [
    {
      accessorKey: "user_name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone_num",
      header: "Phone",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.role}</span>
      ),
    },
    {
      accessorKey: "isBlocked",
      header: "Status",
      cell: ({ row }) => (
        <div className="">
          <Badge
            variant={row.original.isBlocked ? "destructive" : "default"}
            className="px-3 py-1 text-sm"
          >
            {row.original.isBlocked ? "Blocked" : "Active"}
          </Badge>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="shadow-md rounded px-3 border-t">
      <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">Latest Listings</h3>
        <HRTable data={latestListings} columns={listingColumns} />
      </div>

      <div className="shadow-md rounded px-3 border-t">
      <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">Latest Requests</h3>
        <HRTable data={latestRequests} columns={requestColumns} />
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">Latest Users</h3>
        <HRTable data={latestUsers} columns={userColumns} />
      </div>
    </div>
  );
}
