"use client";

import { Button } from "@/components/ui/button";
import DisplayUserModal from "@/components/ui/core/HRModal/displayUserModal";
import { HRTable } from "@/components/ui/core/HRTable";
import { useUser } from "@/context/UserContext";
import { getSingleUser } from "@/services/AuthService";
import { blockUser } from "@/services/Users";
import { userType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeAlert, Eye } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const AllUsersPage = ({ data }: { data: userType[] }) => {
  const { user } = useUser();
  const [selectedUser, setSelectedUser] = useState<userType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredData = data?.filter((user) => {
    const matchesSearch =
      user.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  const handleView = async (email: string) => {
    try {
      const res = await getSingleUser(email);
      if (res.success) {
        setSelectedUser(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleBlock = async (id: string) => {
    try {
      const res = await blockUser(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<userType>[] = [
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
      accessorKey: "isBlocked",
      header: "Blocked",
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
    {
      accessorKey: "action",
      header: () => <div className="flex justify-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2 items-center">
          <Button
            variant="ghost"
            className=" cursor-pointer size-7"
            onClick={() => handleView(row.original.email)}
          >
            <Eye />
          </Button>
          <Button
            disabled={user?.email === row.original.email}
            variant="ghost"
            className="cursor-pointer rounded-full size-7"
            onClick={() => handleBlock(row.original._id!)}
          >
            <BadgeAlert />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">Users</h3>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Select onValueChange={(value) => setFilterRole(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="tenant">Tenant</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="min-h-[calc(100vh-200px)]">
        <HRTable data={filteredData} columns={columns} />
      </div>

      {selectedUser && (
        <DisplayUserModal
          isOpen={Boolean(selectedUser)}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default AllUsersPage;
