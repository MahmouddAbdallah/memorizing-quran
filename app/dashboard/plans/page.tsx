import axios from 'axios';
import React from 'react'
import PlansTable from './components/PlansTable';
import { revalidatePath } from 'next/cache';
// import { getPlans } from '@/app/utils/get-data/fetchPlan';

export const dynamic = 'force-dynamic'

const Plan = async () => {
    const getPlans = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/plan`, {
            method: "GET",
            credentials: 'include',
            cache: "no-cache",
        })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }
    const data = await getPlans()

    return (
        <div className=''>
            <div className='text-center pt-20 pb-10'>
                <h6 className='text-xl font-medium'> الخطط</h6>
            </div>
            <div className='relative overflow-x-auto bg-white py-10 lg:px-5 lg:rounded-md w-screen lg:w-[calc(100vw-310px)]'>
                <PlansTable data={data} />
            </div>
        </div>
    )

}

export default Plan