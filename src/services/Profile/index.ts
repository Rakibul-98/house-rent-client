'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const updateProfile = async (updatedData:FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(updatedData),
    });
    revalidateTag("user");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updatePassword = async (updatedData:FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(updatedData),
    });
    revalidateTag("user");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
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