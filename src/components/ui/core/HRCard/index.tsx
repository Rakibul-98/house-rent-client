"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { listingType } from "@/types/types";

interface ListingCardProps {
  listing: listingType;
  onViewDetails: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={listing?.rentalImages[0] || "https://via.placeholder.com/400"}
          alt={listing?.house_description}
          fill
          className="object-cover bg-gray-200"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{listing?.rentalHouseLocation}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{listing?.numberOfBedrooms} Bedrooms</span>
          <span>•</span>
          <span>${listing?.rentAmount}/mo</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{listing?.house_description}</p>
      </div>

      <div className="p-4 flex justify-center">
        <Button variant="outline" className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ListingCard;