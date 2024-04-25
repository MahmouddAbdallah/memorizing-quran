'use server';
import { cookies } from "next/headers";

export async function getCodes() {
    const token = cookies().get('token')?.value
    const res = await fetch(`${process.env.BASE_URL}/api/tokens?token=${token}`, {
        method: "GET",
        credentials: 'include',
        cache: "reload"
    })
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
    }
    return res.json()
}