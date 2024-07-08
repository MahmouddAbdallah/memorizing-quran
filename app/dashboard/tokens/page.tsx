import React from 'react'
import TokensTable from './TokensTable';
import { cookies } from 'next/headers';

const Tokens = async () => {
    const getCodes = async () => {
        try {
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
        } catch (error) {
            console.error(error);
        }
    }
    const data = await getCodes();

    return (
        <div className='pb-20 flex flex-col items-center'>
            <div className='text-center pt-20 pb-10'>
                <h6 className='text-xl font-medium'> الاكود المتاحه</h6>
            </div>
            <div className='relative overflow-x-auto bg-white py-10 lg:px-5 lg:rounded-md w-[calc(100vw-30px)] lg:w-[calc(100vw-330px)]'>
                <TokensTable data={data} />
            </div>
        </div>
    )
}

export default Tokens