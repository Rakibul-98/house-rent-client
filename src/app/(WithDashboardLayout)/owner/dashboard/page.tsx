import OwnerOverview from '@/components/modules/dashboard/content/OwnerOverview'
import { getAllListing } from '@/services/Listing'
import { getAllRequests } from '@/services/request'
import React from 'react'

const OwnerDashboardPage = async () => {
  const { data: requests } = await getAllRequests(undefined);
    const { data: listings } = await getAllListing(undefined);

  return (
    <div>
      <OwnerOverview requests={requests?.result || []}
        listings={listings?.result || []} />
    </div>
  )
}

export default OwnerDashboardPage;
