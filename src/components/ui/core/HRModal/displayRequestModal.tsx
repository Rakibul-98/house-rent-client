/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { requestType } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  MessageSquare,
  CreditCard,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Button } from "../../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { makePayment } from "@/services/payment";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: requestType;
}

const DisplayRequestModal = ({
  isOpen,
  onClose,
  request,
}: RequestModalProps) => {
  const { user } = useUser();
  const router = useRouter();
  if (!request) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Request Details of{" "}
            <span className="italic text-orange-300">
              {request?.listing?.rentalHouseLocation}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Tenant</p>
                <p className="font-semibold">{request.tenant?.user_name}</p>
              </div>
            </div>
          </div>

          {user?.role === "tenant" ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Button
                  disabled={request.paymentStatus !== "active"}
                  onClick={() => handlePayment(request._id)}
                  className="w-full"
                >
                  Make payment
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Tenant Phone No.</p>
                  <p className="font-semibold">{request.phone}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg col-span-2">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="font-semibold">{request.message}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-semibold">
                  {request?.listing?.owner?.user_name}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Owner Contact No.</p>
                <p className="font-semibold">
                  {request.requestStatus === "approved" ? (
                    <span>{request?.listing?.owner?.phone_num}</span>
                  ) : (
                    <span>880**********</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <Badge
                  variant={
                    request.paymentStatus === "active"
                      ? "default"
                      : "destructive"
                  }
                >
                  {request.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Request Status</p>
                <Badge
                  variant={
                    request.requestStatus === "approved"
                      ? "default"
                      : request.requestStatus === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {request.requestStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-teal-500" />
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-semibold">${request.totalAmount}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
            <Calendar className="w-6 h-6 text-pink-500" />
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-semibold">
                {new Date(request.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayRequestModal;
