"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
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
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#a4de6c"];

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

  // Chart Data
  const usersByMonth = users.reduce((acc, user) => {
    const date = new Date(user.createdAt || "");
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userChartData = Object.entries(usersByMonth).map(([month, count]) => ({
    month,
    count,
  }));

  const listingsByType = listings.reduce((acc, listing) => {
    const type = listing.houseType || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const listingChartData = Object.entries(listingsByType).map(
    ([type, count]) => ({
      name: type,
      value: count,
    })
  );

  const requestStatusData = requests.reduce((acc, req) => {
    const status = req.requestStatus || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const requestChartData = Object.entries(requestStatusData).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  // Columns
  const listingColumns: ColumnDef<listingType>[] = [
    { accessorKey: "propertyTitle", header: "Title" },
    { accessorKey: "houseType", header: "Type" },
    { accessorKey: "rentalHouseLocation", header: "Location" },
    {
      accessorKey: "numberOfBedrooms",
      header: () => <div className="flex justify-center">No of Bedrooms</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.numberOfBedrooms}
        </div>
      ),
    },
    { accessorKey: "rentAmount", header: "Rent" },
  ];

  const requestColumns: ColumnDef<requestType>[] = [
    { accessorKey: "_id", header: "ID" },
    { accessorKey: "tenant.user_name", header: "Request By" },
    { accessorKey: "listing.propertyTitle", header: "Rental" },
    { accessorKey: "listing.rentalHouseLocation", header: "Location" },
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
            ${row.original.requestStatus === "rejected" && "bg-red-500"}
            px-3 py-1 text-white uppercase rounded-sm
          `}
        >
          {row.original.requestStatus}
        </span>
      ),
    },
  ];

  const userColumns: ColumnDef<userType>[] = [
    { accessorKey: "user_name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_num", header: "Phone" },
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
        <Badge
          variant={row.original.isBlocked ? "destructive" : "default"}
          className="px-3 py-1 text-sm"
        >
          {row.original.isBlocked ? "Blocked" : "Active"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">User Signups Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Listings by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={listingChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {listingChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Requests by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={requestChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {requestChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Latest Listings
        </h3>
        <HRTable data={latestListings} columns={listingColumns} />
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Latest Requests
        </h3>
        <HRTable data={latestRequests} columns={requestColumns} />
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Latest Users
        </h3>
        <HRTable data={latestUsers} columns={userColumns} />
      </div>
    </div>
  );
}
