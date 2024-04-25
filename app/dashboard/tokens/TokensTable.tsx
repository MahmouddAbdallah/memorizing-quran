'use client'
import { DeleteIcon, EditIcon, LoadingIcon } from '@/app/components/icons'
import React from 'react'

const TokensTable = ({ data }: { data: any }) => {


    return (
        <table className="w-full text-sm text-right whitespace-nowrap">
            <thead>
                <tr className='text-center'>
                    <th scope="col" className="border-2 py-3 px-10">حذف</th>
                    <th scope="col" className="border-2 py-3 px-10">تعديل</th>
                    <th scope="col" className="border-2 py-3 px-10">الكود</th>
                    <th scope="col" className="border-2 py-3 px-10">السعر</th>
                    <th scope="col" className="border-2 py-3 px-3">العدد</th>
                </tr>
            </thead>
            <tbody>
                {data?.codes?.map((code: any, i: number) => {
                    return (
                        <tr key={code.id} className='text-center'>
                            <td className='border-b-2 border-x-2 py-2 px-5'>
                                <button className='w-full flex justify-center group'>
                                    <DeleteIcon className='w-4 h-4  group-hover:stroke-red-500 duration-150' />
                                </button>
                            </td>
                            <td className='border-b-2 border-x-2 py-2 px-5'>
                                <button
                                    className='w-full flex justify-center group '>
                                    <EditIcon className='w-4 h-4 group-hover:stroke-blue-500 duration-150' />
                                </button>
                            </td>
                            <td className='border-b-2 border-x-2 py-2 px-10'>
                                {code.code}
                            </td>
                            <td className='border-b-2 border-x-2 '>
                                {code.price}
                            </td>
                            <td className='border-b-2 border-x-2 py-2 px-3'>{i + 1}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TokensTable