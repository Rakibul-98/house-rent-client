"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Badge } from "@/components/ui/badge";
import img from "../../../assets/images/req-banner.jpg";
import Image from "next/image";

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

  const propertDetails = [
    { label: "🏠 Title", value: listing?.propertyTitle },
    { label: "📍 Location", value: listing?.rentalHouseLocation },
    { label: "🏷️ Type", value: listing?.houseType },
    { label: "📐 Area Size", value: `${listing?.areaSize} sq ft` },
    { label: "🛏️ Bedrooms", value: listing?.numberOfBedrooms },
    { label: "💰 Rent", value: `$${listing?.rentAmount}/mo` },
    { label: "📅 Posted", value: `${listing?.createdAt}` },
  ];

  return (
    <div className="">
      <div className="relative h-[25vh] w-full overflow-hidden">
        <Image src={img} fill alt="banner-img" className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="w-[90%] mx-auto flex flex-col items-start md:flex-row gap-6 mt-10">
        <div className="w-full md:w-1/2 lg:w-2/3 rounded-md shadow-md p-6 space-y-3">
          <h2 className="text-2xl font-semibold font-serif mb-4 border-b-4 border-[#5274b8] w-fit">
          Property Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-5 text-sm sm:text-base items-start">
            {propertDetails.map(({ label, value }, i) => (
              <div key={i} className="flex gap-5 md:gap-2">
                <span className="font-medium w-28">{label}:</span>
                {label === "📅 Posted" ? (
                  <span>{new Date(value).toLocaleDateString()}</span>
                ) : (
                  <span>{value || "N/A"}</span>
                )}
              </div>
            ))}

            <div className="flex gap-2 items-start lg:col-span-2">
              <p className="font-medium whitespace-nowrap">📝 Description:</p>
              <p>{listing.house_description}</p>
            </div>

            <div className="flex gap-2 items-start lg:col-span-2">
              <span className="font-medium w-28">Features:</span>
              <div className="flex flex-wrap gap-2">
                {listing?.features?.length ? (
                  listing.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 italic">
                    No features listed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold font-serif mb-4 border-b-4 border-[#5274b8] w-fit">
            Make a request
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
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
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
