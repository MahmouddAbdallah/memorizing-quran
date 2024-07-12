'use client'
import ToastServerError from '@/app/components/ToastServerError';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react'
import SearchUser from './SearchUser';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import axios from 'axios';

const Chat = ({ data, error, searchParams }: {
    data: any,
    error: any,
    searchParams: {
        chatId: string,
        userId: string,
        userRole: string
    }
}) => {
    const setChats = useStore((state: any) => state.setChats)
    const chats = useStore((state: any) => state.chats)
    const setUnReadMessage = useStore((state: any) => state.setUnReadMessage)

    useEffect(() => {
        if (data?.chats && !chats.length) {
            setChats(data.chats)
        }
    }, [chats, data, setChats])


    const updateChats = useCallback(async () => {
        try {
            await axios.put(`/api/messages/message?chatId=${searchParams.chatId}`);
            setUnReadMessage(searchParams.chatId)
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
        }
    }, [searchParams, setUnReadMessage])

    useEffect(() => {
        if (searchParams.chatId) {
            updateChats()
        }
    }, [updateChats, searchParams])

    return (
        <div className="w-full pt-3 sm:w-[350px]">
            <div className='w-full sm:w-[350px] min-h-[80svh] p-2 shadow-md rounded-xl'>
                <SearchUser />
                <div className='flex flex-col items-end py-2'>
                    {data &&
                        chats?.map((chat: any) => {
                            return (
                                <Link
                                    href={`/profile/chat?chatId=${chat.id}&userId=${chat.user.id}&userRole=${chat.user.role}`}
                                    key={chat.id}
                                    className={clsx(
                                        'w-full flex justify-end border-b py-2',
                                        { 'bg-primary text-white p-2': searchParams.userId == chat.user.id }
                                    )}
                                >
                                    <div className="w-full flex justify-between items-center">
                                        {chat.unReadMessage ?
                                            <div className='size-7 rounded-full bg-primary text-white flex justify-center items-center'>
                                                <span className='text-xs'>{chat.unReadMessage}</span>
                                            </div> : <div />
                                        }
                                        <div className='flex gap-3'>
                                            <div >
                                                <span className="font-semibold block">
                                                    {chat.user.name}
                                                </span>
                                                <span className='font-medium block'>
                                                    {chat.updatedAt ? new Date(chat.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : ""}
                                                </span>
                                            </div>
                                            <div className='size-16 bg-black text-white flex justify-center items-center rounded-full'>
                                                {chat.user.name.split('')[0]}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                {error && <ToastServerError error={error} />}
            </div>
        </div>
    )
}

export default Chat