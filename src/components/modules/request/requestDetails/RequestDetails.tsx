"use client";

import React from "react";
import { requestType } from "@/types/types";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { makePayment } from "@/services/payment";
import {
  User,
  Phone,
  MessageSquare,
  CreditCard,
  Calendar,
  AlertCircle,
  CreditCardIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "../../../../assets/svg/req-img.svg";

interface RequestPageProps {
  request: requestType;
}

const RequestDetails = ({ request }: RequestPageProps) => {
  const { user } = useUser();
  const router = useRouter();
  if (!request) return <p>No request found.</p>;

  const handlePayment = async (requestId: string) => {
    try {
      const res = await makePayment(requestId);
      if (res.success) {
        toast.success(res.message);
        router.push(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  return (
    <div className=" mx-auto flex">
      <div className="relative z-10 flex items-center justify-center w-full xl:w-1/2 my-5 xl:my-0">
        <div className="max-w-2xl shadow-xl bg-white/90 p-5 rounded-md">
          <h1 className="text-3xl font-bold mb-6">
            Request Details of
            <span className="italic text-[#5274b8] ml-2">
              {request?.listing?.propertyTitle}
            </span>
          </h1>

          <div className="grid grid-cols-2">
            <DetailCard
              icon={<User className="text-blue-500" />}
              label="Tenant"
              value={request.tenant?.user_name}
            />

            {user?.role === "tenant" ? (
              <div className="border rounded-lg p-4 shadow-md">
                <Button
                  disabled={request.paymentStatus !== "active"}
                  onClick={() => handlePayment(request._id)}
                  className="w-full flex gap-2 justify-center items-center border hover:bg-transparent hover:text-black"
                >
                  Make Payment <CreditCardIcon />
                </Button>
              </div>
            ) : (
              <DetailCard
                icon={<Phone className="text-green-500" />}
                label="Tenant Phone No."
                value={request.phone}
              />
            )}

            <DetailCard
              icon={<MessageSquare className="text-purple-500" />}
              label="Message"
              value={request.message}
              fullSpan
            />

            <DetailCard
              icon={<User className="text-blue-500" />}
              label="Owner"
              value={request?.listing?.owner?.user_name}
            />

            <DetailCard
              icon={<Phone className="text-green-500" />}
              label="Owner Contact No."
              value={
                request.requestStatus === "approved"
                  ? request?.listing?.owner?.phone_num
                  : "880**********"
              }
            />

            <DetailCard
              icon={<CreditCard className="text-orange-500" />}
              label="Payment Status"
              value={
                <Badge
                  className={`uppercase px-2 text-white ${
                    request.paymentStatus === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {request.paymentStatus}
                </Badge>
              }
            />

            <DetailCard
              icon={<AlertCircle className="text-red-500" />}
              label="Request Status"
              value={
                <Badge
                  className={`uppercase px-2 text-white ${
                    request.requestStatus === "approved"
                      ? "bg-green-500"
                      : request.requestStatus === "pending"
                      ? "bg-gray-500"
                      : "bg-red-500"
                  }`}
                >
                  {request.requestStatus}
                </Badge>
              }
            />

            <DetailCard
              icon={<CreditCard className="text-teal-500" />}
              label="Total Amount"
              value={`$${request.totalAmount}`}
            />

            <DetailCard
              icon={<Calendar className="text-pink-500" />}
              label="Created At"
              value={new Date(request.createdAt!).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 xl:relative xl:w-1/2">
            <Image
              src={img}
              alt="Register img"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 xl:hidden" />
          </div>
    </div>
  );
};

const DetailCard = ({
  icon,
  label,
  value,
  fullSpan = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  fullSpan?: boolean;
}) => (
  <div
    className={` p-4 flex gap-4 items-start ${
      fullSpan ? "col-span-2" : ""
    }`}
  >
    <div className="w-6 h-6">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold break-words text-wrap max-w-full">{value}</p>
    </div>
  </div>
);

export default RequestDetails;
