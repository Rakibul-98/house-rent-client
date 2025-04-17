'use server'

import cloudinary from "@/lib/cloudinary";
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
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(buffer);
  });

  return (result as any).secure_url;
};