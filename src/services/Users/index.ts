"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
            headers: {
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["users"],
            },
        })
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const getSingleUser = async (userEmail: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userEmail}`, {
            next: {
                tags: ["users"],
            },
            headers: {
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
        })
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}

export const blockUser = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users/${userId}/block`, {
            method: "PATCH",
            headers: {
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
        })
        revalidateTag("users");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
}