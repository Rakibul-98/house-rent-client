"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listingType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestValidationSchema } from "../request/create-request/requestValidation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createRequest } from "@/services/request";
import { z } from "zod";

type RequestFormData = z.infer<typeof requestValidationSchema>;

export default function RequestListing({ listing }: { listing: listingType }) {
  const router = useRouter();

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestValidationSchema),
    defaultValues: {
      listing: listing._id,
      totalAmount: listing.rentAmount || 0,
      phone: "",
      message: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<RequestFormData> = async (data) => {
    try {
      const res = await createRequest(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/tenant/requests");
        form.reset();
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Listing Info */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Listing Details</h2>
          <div>
            <p><span className="font-medium text-gray-600">Location:</span> {listing.rentalHouseLocation}</p>
            <p><span className="font-medium text-gray-600">Rent:</span> ${listing.rentAmount}</p>
            <p><span className="font-medium text-gray-600">Bedrooms:</span> {listing.numberOfBedrooms}</p>
            {/* <p><span className="font-medium text-gray-600">Bathrooms:</span> {listing.bathrooms}</p> */}
            {/* <p><span className="font-medium text-gray-600">Size:</span> {listing.squareFeet} sqft</p> */}
            {/* <p><span className="font-medium text-gray-600">Type:</span> {listing.houseType}</p> */}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Make a request for{" "}
            <span className="italic text-amber-500">
              {listing.rentalHouseLocation}
            </span>
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...form.register("listing")} />

              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-100"
                        readOnly
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
