import ListingDetails from "@/components/modules/listings/listing-details/ListingDetails";
import { getSingleListing } from "@/services/Listing";
import React from "react";

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;
  const { data: listing } = await getSingleListing(listingId);

  return (
    <div>
      <ListingDetails listing={listing} />
    </div>
  );
};

export default ListingDetailsPage;
