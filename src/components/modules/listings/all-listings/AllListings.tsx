"use client";

import ListingCard from "@/components/ui/core/HRCard";
import { listingType } from "@/types/types";
import AllListingsHeader from "./AllListingHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AllListings = ({ data }: { data: listingType[] }) => {
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter();

  const handleViewDetails = (listingId: string) => {
    router.push(`/listing-details/${listingId}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    const filtered = data.filter((listing) =>
      listing.rentalHouseLocation.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle rent range
  const handleRentRangeChange = (min: number, max: number) => {
    const filtered = data.filter(
      (listing) => listing.rentAmount >= min && listing.rentAmount <= max
    );
    setFilteredData(filtered);
  };

  // Handle bedrooms range
  const handleBedroomsRangeChange = (min: number, max: number) => {
    const filtered = data.filter(
      (listing) =>
        listing.numberOfBedrooms >= min && listing.numberOfBedrooms <= max
    );
    setFilteredData(filtered);
  };

  // Handle sort
  const handleSort = (sort: string) => {
    const sorted = [...filteredData];
    switch (sort) {
      case "price_asc":
        sorted.sort((a, b) => a.rentAmount - b.rentAmount);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.rentAmount - a.rentAmount);
        break;
      case "bedrooms_asc":
        sorted.sort((a, b) => a.numberOfBedrooms - b.numberOfBedrooms);
        break;
      case "bedrooms_desc":
        sorted.sort((a, b) => b.numberOfBedrooms - a.numberOfBedrooms);
        break;
      default:
        break;
    }
    setFilteredData(sorted);
  };

  return (
    <div className="container mx-auto p-6 xl:px-0">
      <AllListingsHeader
        onSearch={handleSearch}
        onRentRangeChange={handleRentRangeChange}
        onBedroomsRangeChange={handleBedroomsRangeChange}
        onSortChange={handleSort}
      />
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-xl text-gray-600">No listings found.</p>
          <p className="text-sm text-gray-500">Try another location or adjust your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              onViewDetails={() => handleViewDetails(listing._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllListings;