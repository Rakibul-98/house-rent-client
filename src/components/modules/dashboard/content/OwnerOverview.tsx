"use client";

import { HRTable } from "@/components/ui/core/HRTable";
import { listingType, requestType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import dayjs from "dayjs";

interface OverviewProps {
  requests: requestType[];
  listings: listingType[];
}

export default function OwnerOverview({ requests, listings }: OverviewProps) {
  const COLORS = ["#82ca9d", "#ffc658", "#ff4d4f"];

  const latestRequests = [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 1998).getTime() -
        new Date(a.createdAt ?? 1998).getTime()
    )
    .slice(0, 3);

  const latestListings = [...listings]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 1998).getTime() -
        new Date(a.createdAt ?? 1998).getTime()
    )
    .slice(0, 3);

  const requestStatusChartData = [
    {
      name: "Pending",
      count: requests.filter((r) => r.requestStatus === "pending").length,
    },
    {
      name: "Approved",
      count: requests.filter((r) => r.requestStatus === "approved").length,
    },
    {
      name: "Rejected",
      count: requests.filter((r) => r.requestStatus === "rejected").length,
    },
  ];

  const paymentStatusData = [
    {
      name: "Paid",
      value: requests.filter((r) => r.paymentStatus === "paid").length,
    },
    {
      name: "Active",
      value: requests.filter((r) => r.paymentStatus === "active").length,
    },
    {
      name: "Inactive",
      value: requests.filter((r) => r.paymentStatus === "inactive").length,
    },
  ];

  const today = dayjs();
  const requestOverTimeData = Array.from({ length: 7 }).map((_, i) => {
    const day = today.subtract(6 - i, "day").format("MMM D");
    const count = requests.filter(
      (r) => dayjs(r.createdAt).format("MMM D") === day
    ).length;

    return { day, count };
  });

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
          className={`${
            row.original.paymentStatus === "inactive" && "bg-red-500"
          } ${row.original.paymentStatus === "paid" && "bg-green-500"} ${
            row.original.paymentStatus === "active" && "bg-amber-300"
          } px-3 py-1 text-white uppercase rounded-sm`}
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
          className={`${
            row.original.requestStatus === "pending" && "bg-amber-300"
          } ${row.original.requestStatus === "approved" && "bg-green-500"} ${
            row.original.requestStatus === "rejected" && "bg-red-500"
          } px-3 py-1 text-white uppercase rounded-sm`}
        >
          {row.original.requestStatus}
        </span>
      ),
    },
  ];

  const listingColumns: ColumnDef<listingType>[] = [
    { accessorKey: "propertyTitle", header: "Title" },
    { accessorKey: "houseType", header: "Type" },
    { accessorKey: "rentalHouseLocation", header: "Location" },
    {
      accessorKey: "numberOfBedrooms",
      header: () => <div className="text-center">No of Bedrooms</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.numberOfBedrooms}</div>
      ),
    },
    { accessorKey: "rentAmount", header: "Rent" },
  ];

  return (
    <div className="space-y-10">
      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Request Status Overview
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={requestStatusChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#5274b8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-1/2 shadow-md rounded px-3 border-t min-w-0">
          <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
            Payment Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Tooltip />
              <Pie
                data={paymentStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {paymentStatusData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:w-1/2 shadow-md rounded px-3 border-t min-w-0">
          <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
            Requests Over the Last 7 Days
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={requestOverTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#5274b8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Latest Requests
        </h3>
        <HRTable data={latestRequests} columns={requestColumns} />
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Latest Listings
        </h3>
        <HRTable data={latestListings} columns={listingColumns} />
      </div>
    </div>
  );
}
