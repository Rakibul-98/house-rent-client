/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingValidationSchema } from "./listingValidation";
import HRImageUploader from "@/components/ui/core/HRImageUploader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createListing } from "@/services/Listing";
import { useRouter } from "next/navigation";

export default function CreateListingForm() {
  const form = useForm({
    resolver: zodResolver(listingValidationSchema),
    defaultValues: {
      rentalHouseLocation: "",
      house_description: "",
      features: [],
      rentAmount: 0,
      numberOfBedrooms: 1,
      // features: [{ value: "" }],
      rentalImages: [],
    },
  });

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    setValue("rentalImages", imagePreview);
  }, [imagePreview, setValue]);

  // const { append: appendFeature, fields: featureFields } = useFieldArray({
  //   control: form.control,
  //   name: "features",
  // });

  // const addFeature = () => {
  //   appendFeature({ value: "" });
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const features = data.features.map(
    //   (feature: { value: string }) => feature.value
    // );

    if (data.rentalImages.length < 1) {
      setImageError(true);
      return;
    }
    try {
      const res = await createListing(data);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        setImagePreview([]);
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
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold">Create Listing</h1>
          <p className="font-extralight text-sm text-gray-600">
            List your property for rent!
          </p>
        </div>
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

          {/* <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Features</p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addFeature}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`features.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div> */}

          <HRImageUploader
            setImageFiles={setImageFiles}
            setImagePreview={setImagePreview}
            label="Upload Images"
          />
          {imagePreview.length < 1 && imageError && (
            <span className="text-red-500">Image is required!</span>
          )}
          {imagePreview.length > 0 &&
            imagePreview.map((preview, index) => (
              <div
                key={index}
                className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
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

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Listing..." : "Create Listing"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
