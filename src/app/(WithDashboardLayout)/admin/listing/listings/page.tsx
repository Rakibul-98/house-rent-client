/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/ui/core/HRModal/deleteConfirmationModal";
import DisplayListingModal from "@/components/ui/core/HRModal/displayListingModal";
import { HRTable } from "@/components/ui/core/HRTable";
import TablePagination from "@/components/ui/core/HRTable/TablePagination";
import { useUser } from "@/context/UserContext";
import { deleteListing } from "@/services/Listing";
import { listingType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const AllListingPage = ({
  data,
  totalData,
}: {
  data: listingType[];
  totalData: number;
}) => {

  console.log(data);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isListingModalOpen, setListingModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<listingType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { user } = useUser();
  const router = useRouter();
  const numOfPage = Math.ceil(totalData / 9) || 1;

  const filteredData = data.filter((listing) =>
    listing.rentalHouseLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (data: listingType) => {
    setSelectedListing(data);
    setListingModalOpen(true);
  };

  const handleDelete = (data: listingType) => {
    setSelectedId(data?._id);
    setSelectedName(data?.rentalHouseLocation);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteListing(selectedId);
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

  const handleEdit = (data: listingType) => {
    router.push(`/owner/listing/update-listing/${data?._id}`);
  };

  const columns: ColumnDef<listingType>[] = [
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
          {user?.role !== "tenant" && (
            <>
              {user?.role === "owner" && (
                <Button
                  variant="ghost"
                  className="cursor-pointer rounded-full size-7"
                  onClick={() => handleEdit(row.original)}
                >
                  <Edit />
                </Button>
              )}
              <Button
                variant="ghost"
                className="cursor-pointer rounded-full size-7"
                onClick={() => handleDelete(row.original)}
              >
                <X />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">Lists</h3>
        <Input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px]"
        />
      </div>

      <div className="min-h-[calc(100vh-200px)]">
        <HRTable data={filteredData} columns={columns} />
      </div>

      <TablePagination totalPage={numOfPage} />

      <DeleteConfirmationModal
        name={selectedName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
      />
      {selectedListing && (
        <DisplayListingModal
          isOpen={isListingModalOpen}
          onClose={() => setListingModalOpen(false)}
          listing={selectedListing}
        />
      )}
    </div>
  );
};

export default AllListingPage;