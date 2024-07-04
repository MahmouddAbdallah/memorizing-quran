'use server';
import { cookies } from "next/headers";

export async function getCodes() {
    const token = cookies().get('token')?.value
    const res = await fetch(`${process.env.BASE_URL}/api/tokens`, {
        method: "GET",
        credentials: 'include',
        cache: "reload",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!res.ok) {
        return new Error(await res.text());
    }
    return res.json()
}