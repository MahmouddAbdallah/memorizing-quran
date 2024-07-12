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
    const token = cookies().get('token')?.value;
    const res = await fetch(`${process.env.BASE_URL}/api/plan/${id}`, {
        method: "GET",
        credentials: 'include',
        cache: "reload",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!res.ok) {
        return await res.text()
    }
    return res.json()
}