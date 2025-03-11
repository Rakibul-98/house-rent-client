"use client"

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { listingType } from "@/types/types";
import { Bed, Coins, MailPlus, MapPin, User2Icon, Zap } from "lucide-react";

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: listingType;
}

const DisplayListingModal = ({ isOpen, onClose, listing }: ListingModalProps) => {
  const [selectedImage, setSelectedImage] = useState(listing?.rentalImages[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-50 mt-1">
          <Image
            src={selectedImage}
            alt="Main Listing Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-2">
          {listing?.rentalImages.map((image, index) => (
            <div
              key={index}
              className="relative w-16 h-10 rounded-md overflow-hidden cursor-pointer bg-gray-50"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image}
                alt={`Listing Image ${index + 1}`}
                fill
                className="object-cover bg-gray-50"
              />
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-2">
        <p>{listing?.house_description}</p>
            <div className="md:flex justify-between">
            <p className="flex gap-2"><strong><MapPin/></strong> {listing?.rentalHouseLocation}</p>
            <p className="flex gap-2"><strong><Coins/></strong> ${listing?.rentAmount}</p>
            </div>
          
          <p className="flex gap-2"><strong><Bed/></strong> <span className="font-bold bg-gray-100 rounded-full px-5">{listing?.numberOfBedrooms}</span></p>
          
          <p className="flex gap-2"><strong><Zap/></strong> <span className="">{listing?.features.join(", ")}</span></p>

          <div className="md:flex justify-between">
          <p className="flex gap-2"><strong><User2Icon/></strong> {listing?.owner.user_name}</p>
          <p className="flex gap-2"><strong><MailPlus/></strong> {listing?.owner.email}</p>
            </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayListingModal;