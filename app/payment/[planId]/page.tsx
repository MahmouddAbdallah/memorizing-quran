import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'
import FormData from './FormData'
import { getPlan } from '@/app/utils/get-data/fetchPlan'

const PlanId = async ({ params }: { params: Params }) => {
    const { planId } = params;
    const data = await getPlan(planId as string)

    return (
        <div className='w-svh h-full py-20 flex justify-center'>
            <div className='w-full lg:w-[500px] border-2 bg-white rounded-md py-10 '>
                <div className='px-5'>
                    <div className='flex justify-between pb-5'>
                        <p className='font-semibold'>{data.plan?.price} E.G</p>
                        <p>السعر</p>
                    </div>
                    <FormData planId={planId} />
                </div>
            </div>
        </div>
    )
}

export default PlanId