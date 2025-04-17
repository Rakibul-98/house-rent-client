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
import { listingValidationSchema } from "./listingValidation";
import HRImageUploader from "@/components/ui/core/HRImageUploader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FileText, X } from "lucide-react";
import { toast } from "sonner";
import { createListing } from "@/services/Listing";
import { useRouter } from "next/navigation";

export default function CreateListingForm() {
  const form = useForm({
    resolver: zodResolver(listingValidationSchema),
  });
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
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
    if (imageFiles.length < 1) {
      setImageError(true);
      return;
    }
    try {
      const res = await createListing({ ...data, rentalImages: imageFiles });
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
          <FileText /> List your property for rent!
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
                  <Input {...field} placeholder="Enter property location" />
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

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount</FormLabel>
                  <FormControl>
                    <Input
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
                  className="relative w-full h-36 md:size-36 rounded-md overflow-hidden border border-dashed border-gray-300"
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

          <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || isUploading}>
            {isUploading
              ? "Uploading Images..."
              : isSubmitting
              ? "Creating Listing..."
              : "Create Listing"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
