import ToastServerError from '@/app/components/ToastServerError';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import SearchUser from './SearchUser';

const Chat = async ({ data, error, searchParams }: {
    data: any,
    error: any,
    searchParams: {
        chatId: string,
        userId: string,
        userRole: string
    }
}) => {

    return (
        <div className="w-full pt-3 sm:w-[350px]">
            <div className='w-full sm:w-[350px] min-h-[80svh] p-2 shadow-md rounded-xl'>
                <SearchUser />
                <div className='flex flex-col items-end py-2'>
                    {data &&
                        data?.chats?.map((chat: any) => {
                            return (
                                <Link
                                    href={`/profile/chat?chatId=${chat.id}&userId=${chat.user.id}&userRole=${chat.user.role}`}
                                    key={chat.id}
                                    className={clsx(
                                        'w-full flex justify-end',
                                        { 'bg-primary text-white p-2': searchParams.userId == chat.user.id }
                                    )}
                                >
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