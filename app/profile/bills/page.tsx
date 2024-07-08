import { cookies } from 'next/headers';
import React from 'react'

const page = async () => {
    const token = cookies().get('token')?.value;

    const fetchBills = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/bills`, {
                method: "GET",
                credentials: 'include',
                next: { revalidate: 100 },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            return await res.json()
        } catch (error: any) {
            console.error(error.message);
        }
    }
    const data = await fetchBills();
    return (
        <div>
            <div className='p-container py-10'>
                <div className='flex justify-end flex-wrap'>
                    {data?.bills?.length ?
                        data.bills.map((item: { id: string; subPlan: any }) => {
                            return (
                                <div key={item.id}>
                                    <div className='border px-20 py-5 text-center rounded-lg'>
                                        <div>
                                            السعر : {item.subPlan.price}
                                        </div>
                                        <div>
                                            الوقت : {item.subPlan.duration}
                                        </div>
                                        <div>
                                            الاطفال : {item.subPlan.children}
                                        </div>
                                        <div>
                                            الطلاب : {item.subPlan.student}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <div className='w-full'>
                            <div className='w-full flex justify-center border-2 border-primary/70 rounded-lg'>
                                <div className='px-5 py-10 text-center'>
                                    <div className='text-2xl font-bold text-primary/70'>لا يوجد فواتيرى
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default page