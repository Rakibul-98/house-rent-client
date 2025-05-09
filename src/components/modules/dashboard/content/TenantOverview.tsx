"use client";

import { HRTable } from "@/components/ui/core/HRTable";
import { requestType } from "@/types/types";
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
} from "recharts";

interface OverviewProps {
  requests: requestType[];
}

export default function TenantOverview({ requests }: OverviewProps) {
  const latestRequests = [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 1998).getTime() -
        new Date(a.createdAt ?? 1998).getTime()
    )
    .slice(0, 5);

  const requestStatusChartData = [
    { name: "Pending", count: requests.filter(r => r.requestStatus === "pending").length },
    { name: "Approved", count: requests.filter(r => r.requestStatus === "approved").length },
    { name: "Rejected", count: requests.filter(r => r.requestStatus === "rejected").length },
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
            ${row.original.requestStatus === "rejected" && "bg-red-500"} 
            px-3 py-1 text-white uppercase rounded-sm
          `}
        >
          {row.original.requestStatus}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="shadow-md rounded px-3 border-t mb-8">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Request Status Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={requestStatusChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#5274b8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="shadow-md rounded px-3 border-t">
        <h3 className="text-xl font-serif border-b-4 border-[#5274b8] w-fit m-2">
          Latest Requests
        </h3>
        <HRTable data={latestRequests} columns={requestColumns} />
      </div>
    </div>
  );
}
