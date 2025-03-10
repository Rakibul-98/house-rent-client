import UpdateListingForm from '@/components/modules/listing/update-listing/UpdateListingForm';
import { getSingleListing } from '@/services/Listing';
import React from 'react'

const ListingUpdatePage = async({params}:{params:Promise<{listingId: string}>}) => {

    const { listingId } = await params;
    const {data:listing} = await getSingleListing(listingId);
  return (
    <div>
        <UpdateListingForm listing={listing} />
    </div>
  )
}

export default ListingUpdatePage;
