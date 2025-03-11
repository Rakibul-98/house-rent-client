"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import successImg from "../../assets/gif/paymentSuccess.gif";
import { useEffect } from "react";
import { verifyPayment } from "@/services/payment";
import { toast } from "sonner";
import { Suspense } from "react";

const PaymentSuccessPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderIdFromParams = searchParams.get("order_id");
    if (orderIdFromParams) {
      const verifyPaymentAsync = async () => {
        try {
          const res = await verifyPayment(orderIdFromParams);
          if (res.success) {
            toast.success("Payment completed successfully!!");
          }
        } catch (err: any) {
          console.error(err?.message);
        }
      };

      verifyPaymentAsync();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <title>Payment Success - House Finder</title>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center">
          <Image
            src={successImg}
            alt="Payment Successful"
            width={300}
            height={300}
          />
        </div>

        <h1 className="text-3xl font-bold mt-6">Payment Successful!</h1>
        <p className="text-gray-600 mt-4">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <p className="text-lg text-gray-700 mt-4">Have a great day! 🎉</p>

        <Button
          onClick={() => router.push("/")}
          className="mt-6 w-full bg-green-500 hover:bg-green-600"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;