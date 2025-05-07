"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { listingType } from "@/types/types";
import { useUser } from "@/context/UserContext";
import CreateRequestModal from "../../request/create-request/CreateRequestForm";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Info,
  MessageCircle,
  Send,
} from "lucide-react";

import { useKeenSlider } from "keen-slider/react";

const ListingDetails = ({ listing }: { listing?: listingType }) => {
  const { user } = useUser();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const handleRequest = (listingId: string | undefined) => {
    setIsRequestModalOpen(true);
    console.log(listingId);
  };

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 lg:mb-0">
          {listing?.house_description?.split(" ").slice(0, 4).join(" ")}...
        </h1>
        <Badge
          className={`${
            listing?.isAvailable ? "bg-green-500" : "bg-red-500"
          } font-semibold`}
        >
          {listing?.isAvailable ? "Available" : "Not Available"}
        </Badge>
      </div>

      <div className="mb-8">
        <div className="relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="keen-slider rounded-md overflow-hidden"
          >
            {listing?.rentalImages.map((image, index) => (
              <div
                key={index}
                className="keen-slider__slide relative w-full h-64 md:h-80 lg:h-96"
              >
                <Image
                  src={image}
                  alt={`Listing Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
            <Button
              variant="outline"
              onClick={() => instanceRef.current?.prev()}
              className="pointer-events-auto rounded-full w-10 h-10 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => instanceRef.current?.next()}
              className="pointer-events-auto rounded-full w-10 h-10 p-2"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-2">
          {listing?.rentalImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                currentSlide === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 📄 Listing Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4 flex gap-2">
              <FileText />
              Property Details
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="font-medium">Location:</span>
                <span>{listing?.rentalHouseLocation}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium">Bedrooms:</span>
                <span>{listing?.numberOfBedrooms}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium">Rent:</span>
                <span>${listing?.rentAmount}/mo</span>
              </div>
              <div className="flex gap-4">
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

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{listing?.house_description}</p>
          </div>
        </div>

        {/* 📞 Contact Owner */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4 flex gap-2">
            <MessageCircle />
            Contact Owner
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="font-medium">Name:</span>
              <span>{listing?.owner.user_name}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-medium">Email:</span>
              <span>{listing?.owner.email}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-medium">Phone:</span>
              <span>**********</span>
            </div>
            <small className="italic text-red-500">
              ** You can see owner phone number only after your request gets
              approved. **
            </small>
          </div>
          <div className="mt-6 space-y-4">
            <Button
              disabled={user?.role !== "tenant"}
              onClick={() => handleRequest(listing?._id)}
              className="w-full text-xs md:text-md"
            >
              {user?.role !== "tenant"
                ? "Only Tenant can Request a Rent"
                : "Request to Rent"}{" "}
              <Send />
            </Button>
            <Button variant="outline" className="w-full">
              Save Listing
            </Button>
          </div>
        </div>
      </div>

      {/* 🧾 Extra Info */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
          <Info />
          Additional Information
        </h2>
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

      {/* 📨 Request Modal */}
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
