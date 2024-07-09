import React from 'react'
import FormData from './components/FormData'
import { getRole } from '@/lib/verfiyAuth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const page = () => {
    const token = cookies().get('token')?.value;
    const user = getRole(token)
    if (user) {
        redirect('/')
    }
    return (
        <div className=' pb-20'>
            <div className='bg-primary pt-16 pb-40 text-center'>
                <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-white'>تسجيل حساب جديد</h3>
            </div>
            <div className='flex justify-center p-container'>
                <div className='bg-[#fefefe] px-5 pt-5 pb-10 rounded-xl w-full sm:w-10/12 lg:w-[63%] -mt-28 shadow-md'>
                    <FormData />
                </div>
            </div>
        </div>
    )
}

export default page