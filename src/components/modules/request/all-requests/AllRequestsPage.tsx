/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/ui/core/HRModal/deleteConfirmationModal";
import DisplayRequestModal from "@/components/ui/core/HRModal/displayRequestModal";
import UpdateRequestStatusModal from "@/components/ui/core/HRModal/updateRequestStatusModal";
import { HRTable } from "@/components/ui/core/HRTable";
import TablePagination from "@/components/ui/core/HRTable/TablePagination";
import { deleteRequest, updateRequestStatus } from "@/services/request";
import { requestType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Eye, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";

const AllRequestsPage = ({
  data,
  totalData,
}: {
  data: requestType[];
  totalData: number;
}) => {

  const {user} = useUser();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isRequestUpdateModalOpen, setRequestUpdateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<requestType | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredData = filterStatus === "all"
    ? data
    : data.filter((request) => request.requestStatus === filterStatus);

  const handleView = (data: requestType) => {
    setSelectedRequest(data);
    setRequestModalOpen(true);
  };

  const handleDelete = (data: requestType) => {
    setSelectedId(data?._id);
    setSelectedName(data?.listing?.rentalHouseLocation);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteRequest(selectedId);
        if (res.success) {
          toast.success(res.message);
          setDeleteModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleUpdateRequestModal = (id: string) => {
    setSelectedId(id);
    setRequestUpdateModalOpen(true);
  };

  const handleUpdateRequestStatusConfirm = async (status: string) => {
    try {
      if (selectedId) {
        const res = await updateRequestStatus(selectedId, status);
        if (res.success) {
          toast.success(res.message);
          setRequestUpdateModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const numOfPage = Math.ceil(totalData / 9) || 1;

  const columns: ColumnDef<requestType>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "tenant.user_name",
      header: "Request By",
    },
    {
      accessorKey: "listing.rentalHouseLocation",
      header: "Rental",
    },
    {
      accessorKey: "requestStatus",
      header: "Status",
    },
    {
      accessorKey: "action",
      header: () => <div className="flex justify-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2 items-center">
          <Button
            variant="ghost"
            className=" cursor-pointer size-7"
            onClick={() => handleView(row.original)}
          >
            <Eye />
          </Button>
          <>
          <Button
          disabled={user?.role === "tenant"}
              variant="ghost"
              className="cursor-pointer rounded-full size-7"
              onClick={() => handleUpdateRequestModal(row.original._id)}
            >
              <Edit2 />
            </Button>
            <Button
            
              variant="ghost"
              className="cursor-pointer rounded-full size-7"
              onClick={() => handleDelete(row.original)}
            >
              <X />
            </Button>
          </>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="min-h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Requests</h3>
          <Select onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <HRTable data={filteredData} columns={columns} />
      </div>
      <TablePagination totalPage={numOfPage || 1} />
      <DeleteConfirmationModal
        name={selectedName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
      />
      <UpdateRequestStatusModal
        selectedId={selectedId}
        isOpen={isRequestUpdateModalOpen}
        onOpenChange={setRequestUpdateModalOpen}
        onConfirm={handleUpdateRequestStatusConfirm}
      />
      {selectedRequest && (
        <DisplayRequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default AllRequestsPage;