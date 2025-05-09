"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createRequest = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/requests`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(data)
        })
        revalidateTag("requests");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const getSingleRequest = async (requestId: string): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/requests/${requestId}`,
            {
                headers: {
                    'Authorization': (await cookies()).get("accessToken")!.value,
                },
                next: {
                    tags: ["requests"],
                },
            }
        );
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};



export const getAllRequests = async (page?: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/requests?page=${page}`, {
            headers: {
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["requests"],
            },
        })
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}


export const updateRequestStatus = async (requestId: string, data: string): Promise<any> => {

    const modifiedData = { "requestStatus": data };
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/requests/${requestId}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify(modifiedData)
            }
        );
        revalidateTag("requests");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const deleteRequest = async (requestId: string): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/requests/${requestId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("requests");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
