import UpdateListingForm from "@/components/modules/listing/update-listing/UpdateListingForm";
import { getSingleListing } from "@/services/Listing";
import Image from "next/image";
import React from "react";
import updateImg from '../../../../../../assets/svg/update.svg';


const ListingUpdatePage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;
  const { data: listing } = await getSingleListing(listingId);
  return (
    <div className="min-h-screen pb-10 flex justify-center gap-10 items-start">
      <Image
        className="hidden lg:block mt-20"
        src={updateImg}
        alt="House Rent Logo"
        width={500}
        height={600}
      />
      <UpdateListingForm listing={listing} />
    </div>
  );
};

export default ListingUpdatePage;
