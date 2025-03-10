import AllRequestsPage from '@/components/modules/request/all-requests/AllRequestsPage';
import { getAllRequests } from '@/services/request';
import React from 'react';

const TenantRequestsDashboard = async ({searchParams}:{searchParams: Promise<{page: string}>}) => {
    const {page} = await searchParams;
    const requests = await getAllRequests(page);    
    return (
        <div>
            <AllRequestsPage data={requests?.data?.result} totalData={requests?.data?.totalData}/>
        </div>
    );
};

export default TenantRequestsDashboard;