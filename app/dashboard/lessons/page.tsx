import { cookies } from 'next/headers'
import React from 'react'
import LessonTable from './component/LessonTable';

const page = async () => {
    const token = cookies().get('token')?.value;
    const fetchLessons = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/lesson`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                },
            })
            if (!res.ok) {
                return await res.text()
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.error(error);
        }
    }
    const data = await fetchLessons()

    return (
        <div className=''>
            <div className='text-center pt-20 pb-10'>
                <h6 className='text-xl font-medium'> الحصص</h6>
            </div>
            <div className='relative overflow-x-auto bg-white py-10 lg:px-5 lg:rounded-md w-screen lg:w-[calc(100vw-310px)]'>
                <LessonTable lessons={data.lessons as any} />
            </div>
        </div>
    )
}

export default page