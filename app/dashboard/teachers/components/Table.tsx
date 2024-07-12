'use client'
import { DeleteIcon, EditIcon } from '@/app/components/icons'
import React, { useState } from 'react'
import EditTeahcer from './EditTeahcer'

const Table = ({ data }: { data: any }) => {
    const [open, setOpen] = useState(false)
    const [teahcer, setTeahcer] = useState()
    return (
        <div>
            <table className="w-full text-sm text-right whitespace-nowrap">
                <thead>
                    <tr className='text-center'>
                        <th scope="col" className="border-2 py-3 px-3">تعدل</th>
                        <th scope="col" className="border-2 py-3 px-10">الاسم</th>
                        <th scope="col" className="border-2 py-3 px-10">الايميل</th>
                        <th scope="col" className="border-2 py-3 px-10">تاريخ الميلاد</th>
                        <th scope="col" className="border-2 py-3 px-10">الهاتف</th>
                        <th scope="col" className="border-2 py-3 px-3">البلد</th>
                        <th scope="col" className="border-2 py-3 px-3">النوع</th>
                        <th scope="col" className="border-2 py-3 px-3">الدور</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.teachers?.length ?
                            data?.teachers?.map((teahcer: any,) => {
                                return (
                                    <tr key={teahcer.id} className='text-center'>
                                        <td className='border-b-2 border-x-2 py-2 px-5'>
                                            <button
                                                onClick={() => {
                                                    setOpen(true)
                                                    setTeahcer(teahcer)
                                                }}
                                                className='w-full flex justify-center group '>
                                                <EditIcon className='w-4 h-4 group-hover:stroke-blue-500 duration-150' />
                                            </button>
                                        </td>
                                        <td className='border-b-2 border-x-2 py-2 px-10'>
                                            {teahcer.name ? teahcer.name : "-"}
                                        </td>
                                        <td className='border-b-2 border-x-2 '>
                                            {teahcer.email ? teahcer.email : "-"}
                                        </td>
                                        <td className='border-b-2 border-x-2 py-2 px-10'>
                                            {teahcer.date ? teahcer.date : "-"}
                                        </td>
                                        <td className='border-b-2 border-x-2 '>
                                            {teahcer.phone ? teahcer.phone : "-"}
                                        </td>
                                        <td className='border-b-2 border-x-2 py-2 px-10'>
                                            {teahcer.country ? teahcer.country : "-"}
                                        </td>
                                        <td className='border-b-2 border-x-2 '>
                                            {teahcer.gender ? teahcer.gender : "-"}
                                        </td>
                                        <td className='border-b-2 border-x-2 '>
                                            {teahcer.role ? teahcer.role : "-"}
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr>
                                <td colSpan={8} className='border-b-2 border-x-2 py-5 px-3 text-center' >لا يوجد بيانات</td>
                            </tr>
                    }
                </tbody>
            </table>
            {open && <EditTeahcer teacher={teahcer} setOpen={setOpen} />}
        </div>
    )
}

export default Table