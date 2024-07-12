'use client'
import { SendIcon } from '@/app/components/icons'
import { useStore } from '@/lib/store'
import axios from 'axios'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { socket } from '../../../utils/socket'
import { useState } from 'react'

const TypeMessage = ({ searchParams }: {
    searchParams: {
        chatId: string,
        userId: string,
        userRole: string
    }
}) => {
    const { register, handleSubmit, formState: { isValid }, reset } = useForm();
    const setMessage = useStore((state: any) => state.setMessage)
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const { data } = await axios.post(`/api/messages/message?userId=${searchParams.userId}&userRole=${searchParams.userRole}&chatId=${searchParams.chatId}`
                , formData)
            setMessage(data.message)
            if (data.chat) {
                socket.emit('send-msg', {
                    message: data.message,
                    chat: data.chat,
                    receiverId: searchParams.userId
                })
            } else {
                socket.emit('send-msg', {
                    message: data.message,
                    receiverId: searchParams.userId
                })
            }
            reset()
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    })
    return (
        <div className='w-full pt-2'>
            <form onSubmit={onSubmit} className="w-full flex gap-3">
                <button
                    disabled={!isValid || loading}
                >
                    <SendIcon className={clsx(
                        'size-5 rotate-180',
                        { 'stroke-primary': isValid }
                    )}
                    />
                </button>
                <input
                    type="text"
                    placeholder='اكتب الرساله'
                    className='py-2 px-2 w-full outline-none border focus:border-primary rounded-md text-right'
                    {...register('message', { required: true })}
                />
            </form>
        </div>
    )
}

export default TypeMessage