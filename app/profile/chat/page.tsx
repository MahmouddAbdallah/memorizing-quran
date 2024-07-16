import React from 'react'
import Chat from './components/Chat'
import BodyChat from './components/BodyChat'
import TypeMessage from './components/TypeMessage'
import { cookies } from 'next/headers'
import ToastServerError from '@/app/components/ToastServerError'

const page = async ({ searchParams }: {
    searchParams: {
        chatId: string,
        userId: string,
        userRole: string
    }
}) => {
    const token = cookies().get('token')?.value;
    const fetchMessages = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/messages/message?chatId=${searchParams.chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                return { error: await res.text(), data: null }
            }
            return { error: null, data: await res.json() }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchChats = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/messages/chat`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                return { error: await res.text(), data: null }
            }
            return { error: null, data: await res.json() }
        } catch (error) {
            console.error(error);
        }
    }
    let resChat = await fetchChats()
    let res;
    if (searchParams.chatId) {
        res = await fetchMessages();
    }
    return (
        <div className='lg:px-20 xl:px-32'>
            <div className='w-full lg:flex gap-3'>
                <div className='w-full flex flex-col justify-between'>
                    {searchParams.userId ?
                        <div className='pl-2'>
                            <BodyChat messages={res?.data?.messages} searchParams={searchParams} />
                            <TypeMessage searchParams={searchParams} />
                        </div> :
                        <div className='  w-full h-full border shadow-md rounded-xl hidden lg:flex justify-center items-center'>
                            {resChat?.data?.chats?.length ? <span>اختار معلم او طالب</span> : <span>لا يوجد رسائل</span>}
                        </div>
                    }
                </div>
                <div className={searchParams.userId ? "hidden lg:block" : ""}>
                    <Chat
                        data={resChat?.data}
                        error={resChat?.error}
                        searchParams={searchParams}
                    />
                </div>
            </div>
            {res?.error && <ToastServerError error={res.error} />}
        </div>
    )
}

export default page