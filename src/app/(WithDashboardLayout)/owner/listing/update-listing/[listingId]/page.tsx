import UpdateListingForm from "@/components/modules/listing/update-listing/UpdateListingForm";
import { getSingleListing } from "@/services/Listing";
import Image from "next/image";
import React from "react";
import updateImg from "../../../../../../assets/svg/update.svg";

const ListingUpdatePage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;
  const { data: listing } = await getSingleListing(listingId);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen gap-5">
      <div className="relative hidden xl:block -mt-20">
        <Image src={updateImg} alt="update img" fill className="object-contain" />
      </div>
      <div className="flex items-center justify-center">
        <UpdateListingForm listing={listing} />
      </div>
    </div>
  );
};

export default ListingUpdatePage;
