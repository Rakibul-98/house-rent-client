/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createListing = async (data:FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(data)
        })
        revalidateTag("listing");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const getAllListing = async(page?:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings?page=${page}`,{
            next: {
              tags: ["listing"],
            },
          });

    return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const getSingleListing = async(listingId: string)=>{
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,{
          next: {
            tags: ["listing"],
          },
        });

  return res.json();
  } catch (error: any) {
      return Error(error);
  }
}

export const updateListing = async (
  listingData: FieldValues,
  listingId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(listingData)
      }
    );
    revalidateTag("listing");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteListing = async (listingId: string): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
          },
        }
      );
      revalidateTag("listing");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };