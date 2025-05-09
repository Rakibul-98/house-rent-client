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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingValidationSchema } from "./listingValidation";
import HRImageUploader from "@/components/ui/core/HRImageUploader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createListing } from "@/services/Listing";
import { useRouter } from "next/navigation";
import Title from "@/components/home/Shared/Title";

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
    console.log(data);
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
    <div className="shadow-2xl rounded-xl flex-grow max-w-xl w-full p-5">
      <div className="mb-5 w-fit">
        <Title title=" List your property"/>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"
        >
          <FormField
            control={form.control}
            name="propertyTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Cozy 2-bedroom in city center"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaSize"
            
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area Size (sq ft)</FormLabel>
                <FormControl>
                  <Input
                  type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter property size"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="houseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Shared Room">Shared Room</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </FormControl>
                
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rentalHouseLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter property location" />
                </FormControl>
                
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
                
              </FormItem>
            )}
          />
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
                
              </FormItem>
            )}
          />

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
                
              </FormItem>
            )}
          />

          <div className="col-span-2 flex flex-col md:flex-row gap-5">
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

          <Button
            type="submit"
            className="mt-2 w-full col-span-2"
            disabled={isSubmitting || isUploading}
          >
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
