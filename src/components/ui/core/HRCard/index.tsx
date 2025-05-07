"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { listingType } from "@/types/types";
import { Building2} from "lucide-react";
import { useRouter } from "next/navigation";
// import { useUser } from "@/context/UserContext";

interface ListingCardProps {
  listing: listingType;
  onViewDetails: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onViewDetails }) => {
  const router = useRouter();

  const handleRequest = () => {
    router.push(`/request-listing/${listing._id}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-36">
        <Image
          src={listing?.rentalImages[0] || "https://via.placeholder.com/400"}
          alt={listing?.house_description}
          fill
          className="object-cover bg-gray-100"
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-lg font-semibold flex gap-2">
          <Building2/>
          {listing?.rentalHouseLocation}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{listing?.numberOfBedrooms} Bedrooms</span>
          <span>•</span>
          <span className="text-[#5274b8] font-medium text-lg">${listing?.rentAmount}/mo</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">
          {listing?.house_description}</p>
      </div>

      <div className="p-4 pt-0 flex justify-between gap-2">
        <Button variant="outline" className="flex-1 cursor-pointer border-[#5274b8] text-[#5274b8]" onClick={onViewDetails}>
          Details
        </Button>
        <Button variant="default" className="flex-1 cursor-pointer" onClick={handleRequest}>
          Request
        </Button>
      </div>
    </div>
  );
};

export default ListingCard;