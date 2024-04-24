import axios from 'axios';
import React from 'react'
import PlansTable from './components/PlansTable';


const plans = async () => {
    const fetchPlans = async () => {
        try {
            const { data } = await axios.get(`/api/plan`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return data
        } catch (error: any) {
            console.error(error);
        }
    }
    const data = await fetchPlans();

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

export default plans