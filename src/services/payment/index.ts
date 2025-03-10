/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";

export const makePayment = async (requestId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/requests/payment/${requestId}`, {
            method: "POST",
            headers: {
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

export const verifyPayment = async (reqId:string) =>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/requests/verify?request_id${reqId}`, {
            method: "GET",
            headers: {
                'Authorization': (await cookies()).get("accessToken")!.value,
            },
        });
        const result = await res.json();
        return result;
        } catch (error: any) {
            return Error(error);
        }
}