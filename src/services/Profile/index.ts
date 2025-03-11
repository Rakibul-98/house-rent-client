'use server'

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