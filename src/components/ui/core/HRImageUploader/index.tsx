"use client";

import { Input } from "../../input";
import { toast } from "sonner";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<string[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  imagePreview: string[];
  isUploading:boolean;
  setIsUploading:React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HRImageUploader({
  label = "Upload Images",
  setImageFiles,
  setImagePreview,
  imagePreview,
  isUploading, 
  setIsUploading
}: TImageUploader) {
  const maxFiles = 3;

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const currentCount = imagePreview.length;
    if (currentCount + files.length > maxFiles) {
      toast.warning(
        `You can upload a maximum of ${maxFiles} images.`
      );
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const newPreviews = await Promise.all(
        files.map((file) => createImagePreview(file))
      );

      setImagePreview((prev) => [...prev, ...newPreviews]);

      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );

      setImageFiles((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.log(error);
      setImagePreview((prev) => prev.slice(0, -files.length));
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "houseRent");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/drplng4db/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const data = await response.json();
    return data.secure_url;
  };

  return (
    <div>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
        disabled={isUploading}
      />

      <label
        htmlFor="image-upload"
        className={`w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : label}
      </label>
    </div>
  );
}
