import { cookies } from 'next/headers'
import React from 'react'

export const dynamic = 'force-dynamic'
const page = async () => {
    const token = cookies().get('token')?.value;
    const getNotifications = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/notification/admin`, {
            method: "GET",
            credentials: 'include',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (!res.ok) {
            return new Error(await res.text() as string)
        }
        return res.json()
    }
    const data = await getNotifications()
    console.log(data);

    return (
        <div className=''>
            <div className='text-center pt-20 pb-10'>
                <h6 className='text-xl font-medium'>الاشعارات</h6>
            </div>
            <div className='relative overflow-x-auto bg-white py-10 lg:px-5 lg:rounded-md w-screen lg:w-[calc(100vw-310px)]'>


            </div>
        </div>
    )

}

export default page