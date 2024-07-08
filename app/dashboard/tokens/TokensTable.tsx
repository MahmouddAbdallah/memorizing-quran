'use client'
import PopUpMessage from '@/app/components/PopUpMessage'
import { DeleteIcon, EditIcon } from '@/app/components/icons'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
enum Action {
    ADD = 'اضف',
    EDIT = 'تعدل',
    DELETE = 'احذف',
}
const TokensTable = ({ data }: { data: any }) => {
    const [loading, setLoading] = useState(false);
    const [openDeleteCode, setOpenDeleteCode] = useState(false)
    const [id, setId] = useState('');
    const [removeId, setRemoveId] = useState<string[]>([])

    const deleteToken = async (id: string) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`/api/tokens/${id}`)
            toast.success(data.message)
            setRemoveId([...removeId, id])
            setOpenDeleteCode(false)
            setLoading(false)
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    }

    return (
        <div>
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
                    {
                        data?.codes?.length ?
                            data?.codes?.map((code: any, i: number) => {
                                return (
                                    !removeId.some((id) => id == code.id) &&
                                    <tr key={code.id} className='text-center'>
                                        <td className='border-b-2 border-x-2 py-2 px-5'>
                                            <button
                                                onClick={() => {
                                                    setId(code.id)
                                                    setOpenDeleteCode(true)
                                                }}
                                                className='w-full flex justify-center group'>
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
                            })
                            : <tr>
                                <td colSpan={5} className='border-b-2 border-x-2 py-5 px-3 text-center' >لا يوجد بيانات</td>
                            </tr>
                    }
                </tbody>
            </table>
            {openDeleteCode &&
                <PopUpMessage
                    action={Action.DELETE}
                    handleAction={() => { deleteToken(id) }}
                    msg={`هل انت متاكد من حذف الكود`}
                    setOpen={setOpenDeleteCode}
                    loading={loading}
                />}
        </div>
    )
}

export default TokensTable