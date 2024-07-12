import React from 'react'
import PlansTable from './components/PlansTable';

export const dynamic = 'force-dynamic'
const Plan = async () => {
    const getPlans = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/plan`, {
                method: "GET",
                credentials: 'include',
                cache: "no-cache",
            })
            if (!res.ok) {
                return new Error(await res.text() as string)
            }
            return res.json()
        } catch (error) {
            console.error(error);
        }
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