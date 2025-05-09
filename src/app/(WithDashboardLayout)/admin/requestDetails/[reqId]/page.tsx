import RequestDetails from "@/components/modules/request/requestDetails/RequestDetails";
import { getSingleRequest } from "@/services/request";

const RequestDetailsPage = async ({
  params,
}: {
  params: Promise<{ reqId: string }>;
}) => {
  const { reqId } = await params;
  const { data: request } = await getSingleRequest(reqId);
  return (
    <div>
      <RequestDetails request={request} />
    </div>
  );
};

export default RequestDetailsPage;