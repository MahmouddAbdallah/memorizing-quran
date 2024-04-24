import { DeleteIcon, EditIcon } from '@/app/components/icons'
import React from 'react'

const PlansTable = ({ data }: { data: any }) => {
    return (
        <table className="w-full text-sm text-right whitespace-nowrap">
            <thead>
                <tr className='text-center'>
                    <th scope="col" className="border-2 py-3 px-10"> فعل</th>
                    <th scope="col" className="border-2 py-3 px-10">عدد الطلاب</th>
                    <th scope="col" className="border-2 py-3 px-10">عدد الاطفال</th>
                    <th scope="col" className="border-2 py-3 px-10">المده</th>
                    <th scope="col" className="border-2 py-3 px-10">الحصه</th>
                    <th scope="col" className="border-2 py-3 px-10">السعر</th>
                    <th scope="col" className="border-2 py-3 px-3">العدد</th>
                </tr>
            </thead>
            <tbody>
                {data?.plans?.map((plan: any, i: number) => {
                    return (
                        <tr key={plan.id} className='text-center'>
                            <td className='border-b-2 border-x-2 py-2 px-5 '>
                                <div className='flex  justify-center items-center gap-3'>
                                    <button className='flex gap-1 group'>
                                        <span className='block text-xs font-medium  group-hover:text-red-500 duration-150'>حذف</span>
                                        <DeleteIcon className='w-4 h-4  group-hover:stroke-red-500 duration-150' />
                                    </button>
                                    <button className='flex gap-1 group '>
                                        <span className='block text-xs font-medium group-hover:text-blue-500 duration-150'>تعديل</span>
                                        <EditIcon className='w-4 h-4 group-hover:stroke-blue-500 duration-150' />
                                    </button>
                                </div>
                            </td>
                            <td className='border-b-2 border-x-2 py-2 px-10'>{plan.student}</td>
                            <td className='border-b-2 border-x-2 py-2 px-10'>{plan.children}</td>
                            <td className='border-b-2 border-x-2 py-2 px-10'>{plan.duration}</td>
                            <td className='border-b-2 border-x-2 py-2 px-10'>{plan.session}</td>
                            <td className='border-b-2 border-x-2 py-2 px-10'>{plan.price}</td>
                            <td className='border-b-2 border-x-2 py-2 px-3'>{i + 1}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default PlansTable