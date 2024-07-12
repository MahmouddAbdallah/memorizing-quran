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
    const resChat = await fetchChats()
    let res;
    if (searchParams.userId) {
        res = await fetchMessages();
    }
    return (
        <div className='flex gap-3 p-container h-[calc(100svh-123px)]'>
            <div className=' w-full h-full flex flex-col justify-between pt-3'>
                {searchParams.userId &&
                    <>
                        <BodyChat messages={res?.data?.messages} />
                        <TypeMessage searchParams={searchParams} />
                    </>
                }
            </div>
            <Chat
                data={resChat?.data}
                error={resChat?.error}
                searchParams={searchParams}
            />
            {res?.error && <ToastServerError error={res.error} />}
        </div>
    )
}

export default page