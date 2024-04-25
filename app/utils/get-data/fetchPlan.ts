'use server';
import { cookies } from "next/headers";
export async function getPlans() {
    const res = await fetch(`${process.env.BASE_URL}/api/plan`, {
        method: "GET",
        credentials: 'include',
        cache: "no-cache",
        next: { revalidate: 100 }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

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