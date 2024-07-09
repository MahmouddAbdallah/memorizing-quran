'use client'
import { DeleteIcon } from '@/app/components/icons'
import PopUpMessage from '@/app/components/PopUpMessage'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
enum Action {
    ADD = 'اضف',
    EDIT = 'تعدل',
    DELETE = 'احذف',
}
const DeletePlan = ({ planId }: { planId: string }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleDeletePlan = async () => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`/api/plan/${planId}`)
            toast.success(data.message)
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    }
    return (
        <div className='w-full'>
            <button onClick={() => setOpen(true)} className='w-full flex justify-center group'>
                <DeleteIcon className='w-4 h-4  group-hover:stroke-red-500 duration-150' />
            </button>
            {open && <PopUpMessage
                setOpen={setOpen}
                action={Action.DELETE}
                handleAction={handleDeletePlan}
                loading={loading}
                msg='هل تريد حذف هذه الخطه؟'
                key={planId}
            />}
        </div>
    )
}

export default DeletePlan