"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import successImg from "../../assets/gif/paymentSuccess.gif";
import { useEffect } from "react";
import { verifyPayment } from "@/services/payment";
import { toast } from "sonner";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="lg:w-[90%] mx-auto">
        <div className="min-h-screen flex flex-col lg:flex-row relative">
          <title>Login - House Finder</title>

          <div className="absolute inset-0 lg:relative lg:w-1/2">
            <Image
              src={successImg}
              alt="House Rent Logo"
              fill
              className="object-cover lg:object-contain"
              priority
            />
            <div className="absolute inset-0 bg-black/50 lg:hidden" />
          </div>

          <div className="relative z-10 min-h-screen flex items-center justify-center w-full lg:w-1/2 my-5 lg:my-0">
            <div className="rounded-md text-center max-w-md bg-white/85 p-5 shadow-2xl px-10">
              <h1 className="text-3xl font-bold mt-6">Payment Successful!</h1>
              <p className="mt-4 leading-6">
                Thank you for your payment. <br /> Your transaction has been completed successfully. Now you can contact the owner.
              </p>

              <p className="text-lg mt-4">Have a great day! 🎉</p>

              <Button
              variant="default"
                onClick={() => router.push("/")}
                className="mt-6 w-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default PaymentSuccessPage;
