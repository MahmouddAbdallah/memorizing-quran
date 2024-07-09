import { getRole } from '@/lib/verfiyAuth'
import { cookies } from 'next/headers'
import React from 'react'
import TodayTeacher from './components/TodayTeacher';
import Today from './components/Today';

const page = async () => {
    const token = cookies().get('token')?.value;
    const user = getRole(token as string)
    if (user?.role != 'user') {
        return <TodayTeacher />
    }
    else {
        const fetchSession = async () => {
            try {
                const res = await fetch(`${process.env.BASE_URL}/api/session`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (!res.ok) {
                    return new Error(await res.text())
                }
                return await res.json()
            } catch (error) {
                console.error(error);
            }
        }
        const data = await fetchSession()
        return <Today data={data} />
    }
}

export default page