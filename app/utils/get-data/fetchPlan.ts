'use server';
import { cookies } from "next/headers";

export async function getPlan(id: string) {
    const token = await cookies().get('token')?.value
    const res = await fetch(`${process.env.BASE_URL}/api/plan/${id}?token=${token}`, {
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