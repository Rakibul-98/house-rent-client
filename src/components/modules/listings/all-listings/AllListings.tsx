"use client";

import ListingCard from "@/components/ui/core/HRCard";
import { listingType } from "@/types/types";
import AllListingsHeader from "./AllListingHeader";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AllListings = ({ data }: { data: listingType[] }) => {
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const city = searchParams.get("city");

  useEffect(() => {
    if (location && city) {
      const filtered = data.filter(
        (listing) =>
          listing.rentalHouseLocation.toLowerCase().includes(city.toLowerCase()) &&
          listing.rentalHouseLocation.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, location, city]);

  const handleViewDetails = (listingId: string) => {
    router.push(`/listing-details/${listingId}`);
  };

  const handleSearch = (query: string) => {
    const filtered = data.filter((listing) =>
      listing.rentalHouseLocation.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRentRangeChange = (min: number, max: number) => {
    const filtered = data.filter(
      (listing) => listing.rentAmount >= min && listing.rentAmount <= max
    );
    setFilteredData(filtered);
  };

  const handleBedroomsRangeChange = (min: number, max: number) => {
    const filtered = data.filter(
      (listing) =>
        listing.numberOfBedrooms >= min && listing.numberOfBedrooms <= max
    );
    setFilteredData(filtered);
  };

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
      case "newest":
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? "1970-01-01");
          const dateB = new Date(b.createdAt ?? "1970-01-01");
          return dateB.getTime() - dateA.getTime();
        });
        
        break;
      case "oldest":
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? "1970-01-01");
          const dateB = new Date(b.createdAt ?? "1970-01-01");
          return dateA.getTime() - dateB.getTime();
        });
        break;
      default:
        break;
    }
    setFilteredData(sorted);
  };

  const { minRent, maxRent } = useMemo(() => {
    const rents = data.map(listing => listing.rentAmount);
    return {
      minRent: Math.min(...rents),
      maxRent: Math.max(...rents)
    };
  }, [data]);

  const { minBedrooms, maxBedrooms } = useMemo(() => {
    const bedrooms = data.map(listing => listing.numberOfBedrooms);
    return {
      minBedrooms: Math.min(...bedrooms),
      maxBedrooms: Math.max(...bedrooms)
    };
  }, [data]);

  return (
    <div className="w-[90%] min-h-[80vh] mx-auto mt-5 flex gap-5">
      <div className="shadow rounded-lg p-4 h-fit">
        <AllListingsHeader
          onSearch={handleSearch}
          onRentRangeChange={handleRentRangeChange}
          onBedroomsRangeChange={handleBedroomsRangeChange}
          onSortChange={handleSort}
          minRent={minRent}
          maxRent={maxRent}
          minBedrooms={minBedrooms}
          maxBedrooms={maxBedrooms}
        />
      </div>

      <div className="flex-1">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <p className="text-xl text-gray-600">No listings found.</p>
            <p className="text-sm text-gray-500">
              Try another location or adjust your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default AllListings;
