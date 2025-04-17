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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HRImageUploader from "@/components/ui/core/HRImageUploader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { EditIcon, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { listingValidationSchema } from "../create-listing/listingValidation";
import { listingType } from "@/types/types";
import { updateListing } from "@/services/Listing";

export default function UpdateListingForm({
  listing,
}: {
  listing: listingType;
}) {
  console.log(listing);
  const form = useForm({
    resolver: zodResolver(listingValidationSchema),
    defaultValues: {
      rentalHouseLocation: listing.rentalHouseLocation || "",
      house_description: listing.house_description || "",
      features: listing.features || [],
      rentAmount: listing.rentAmount || 0,
      numberOfBedrooms: listing.numberOfBedrooms || 1,
      rentalImages: listing.rentalImages || [],
    },
  });

  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    listing.rentalImages || []
  );
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    setValue("rentalImages", imagePreview);
  }, [imagePreview, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.rentalImages.length < 1) {
      setImageError(true);
      return;
    }
    try {
      const res = await updateListing(
        { ...data, rentalImages: imageFiles },
        listing._id
      );
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        setImagePreview([]);
        setImageFiles([]);
        setImageError(false);
        router.push("/owner/listing");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="shadow-2xl rounded-xl flex-grow max-w-md w-full p-5">
      <div className="mb-5">
        <h1 className="text-xl font-semibold flex gap-2 items-center">
          <EditIcon /> Update Listing Information
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rentalHouseLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter property location"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="house_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your property (10-500 characters)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Enter rent amount"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfBedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Enter number of bedrooms"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                    placeholder="Enter features (comma-separated)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-5">
            <HRImageUploader
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              label="Upload Images"
              imagePreview={imagePreview}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
            {imagePreview.length < 1 && imageError && (
              <span className="text-red-500">Image is required!</span>
            )}
            {imagePreview.length > 0 &&
              imagePreview.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-full h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
                >
                  <Image
                    src={preview}
                    alt="preview"
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => {
                      const newPreview = imagePreview.filter(
                        (_, i) => i !== index
                      );
                      const newFiles = imageFiles.filter((_, i) => i !== index);
                      setImagePreview(newPreview);
                      setImageFiles(newFiles);
                    }}
                    className="absolute top-0 right-0 rounded-full p-0 size-7 cursor-pointer"
                  >
                    <X />
                  </Button>
                </div>
              ))}
          </div>
          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={isSubmitting || isUploading}
          >
            {isUploading
              ? "Uploading Images..."
              : isSubmitting
              ? "Updating..."
              : "Update Listing"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
