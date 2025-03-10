"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { listingType } from "@/types/types";
import { useUser } from "@/context/UserContext";
import CreateRequestModal from "../../request/create-request/CreateRequestForm";
import { useState } from "react";

const ListingDetails = ({ listing }: { listing?: listingType }) => {
  const { user } = useUser();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const handleRequest = (listingId: string | undefined) => {
    setIsRequestModalOpen(true);
    console.log(listingId);
  };

  return (
    <div className="container mx-auto p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 lg:mb-0">
          {listing?.house_description?.split(" ").slice(0, 4).join(" ")}...
        </h1>
        <Badge variant={listing?.isAvailable ? "default" : "destructive"}>
          {listing?.isAvailable ? "Available" : "Not Available"}
        </Badge>
      </div>

      <div className="mb-8">
        <Carousel className="w-full max-w-4xl mx-auto ">
          <CarouselContent>
            {listing?.rentalImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-96 rounded-lg overflow-hidden ">
                  <Image
                    src={image}
                    alt={`Listing Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Location:</span>
                <span>{listing?.rentalHouseLocation}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">Bedrooms:</span>
                <span>{listing?.numberOfBedrooms}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">Rent:</span>
                <span>${listing?.rentAmount}/mo</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">Features:</span>
                <div className="flex flex-wrap gap-2">
                  {listing?.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{listing?.house_description}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Name:</span>
              <span>{listing?.owner.user_name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Email:</span>
              <span>{listing?.owner.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Phone:</span>
              <span>**********</span>
            </div>
          </div>

          {user && user.role === "tenant" && (
            <div className="mt-6 space-y-4">
              <Button
                onClick={() => handleRequest(listing?._id)}
                className="w-full"
              >
                Request to Rent
              </Button>
              <Button variant="outline" className="w-full">
                Save Listing
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Nearby Amenities</h3>
            <ul className="text-gray-600 list-disc list-inside">
              <li>Supermarket - 0.5 km</li>
              <li>School - 1 km</li>
              <li>Park - 0.8 km</li>
              <li>Public Transport - 0.3 km</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Property Rules</h3>
            <ul className="text-gray-600 list-disc list-inside">
              <li>No smoking inside the property</li>
              <li>Pets allowed with prior approval</li>
              <li>Minimum lease duration: 6 months</li>
            </ul>
          </div>
        </div>
      </div>
      {listing && (
        <CreateRequestModal
          listing={listing}
          isOpen={isRequestModalOpen}
          onOpenChange={setIsRequestModalOpen}
        />
      )}
    </div>
  );
};

export default ListingDetails;
