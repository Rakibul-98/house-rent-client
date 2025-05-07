import RequestListing from '@/components/modules/request-listing/RequestListing';
import { getSingleListing } from '@/services/Listing';
import React from 'react'

const RequestListingPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;
  const { data: listing } = await getSingleListing(listingId);

  return (
    <div>
      <title>Request - House Finder</title>
      <RequestListing listing={listing} />
    </div>
  );
};

export default RequestListingPage;