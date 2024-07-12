import { ThreeDotsIcon } from '@/app/components/icons';
import { cookies } from 'next/headers'
import React, { useEffect } from 'react'

export const dynamic = 'force-dynamic'
const page = async () => {
    const token = cookies().get('token')?.value;
    const getNotifications = async () => {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }
    const data = await getNotifications()

    const readNotification = async () => {
        try {
            await fetch(`${process.env.BASE_URL}/api/notification/admin`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    await readNotification();

    return (
        <div className=''>
            <div className='text-center pt-20 pb-10'>
                <h6 className='text-xl font-medium'>الاشعارات</h6>
            </div>
            <div className='relative overflow-x-auto bg-white py-10 lg:px-5 lg:rounded-md w-screen lg:w-[calc(100vw-310px)]'>
                <div className='w-full flex flex-col items-end gap-3'>
                    {data.notification.map((item: any) => {
                        return (
                            <div className='w-full border-b py-2' key={item.id}>
                                <div className='w-full flex justify-between items-center'>
                                    <div className='flex flex-col justify-between h-full items-center space-y-3'>
                                        <ThreeDotsIcon className='size-5' />
                                        {item.isRead ? <div className='size-2 rounded-full bg-gray-500' /> : <div className='size-2 rounded-full bg-green-500' />}
                                    </div>
                                    {
                                        item.user &&
                                        <div className='flex gap-3'>
                                            <div>
                                                <p className='font-semibold'>{item.user.name}</p>
                                                <span className=''>{item.message}</span>
                                            </div>
                                            <div className='size-14 rounded-full bg-black text-white flex items-center justify-center'>
                                                {item?.user?.name.split("")[0] || "U"}
                                            </div>
                                        </div>
                                    }
                                    {
                                        item.teacher &&
                                        <div className='flex gap-3'>
                                            <div>
                                                <p className='font-semibold'>{item.teacher.name}</p>
                                                <span className=''>{item.message}</span>
                                            </div>
                                            <div className='size-14 rounded-full bg-black text-white flex items-center justify-center'>
                                                {item?.teacher?.name.split("")[0] || "U"}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default page