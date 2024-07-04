'use server';
import { cookies } from "next/headers";
export async function getPlans() {
    const res = await fetch(`${process.env.BASE_URL}/api/plan`, {
        method: "GET",
        credentials: 'include',
        next: { revalidate: 100 }
    })
    if (!res.ok) {
        return await res.text()
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
        return await res.text()
    }
    return res.json()
}