'use client'
import { useAppContext } from '@/app/context/appContext'
import { socket } from '@/app/utils/socket'
import { useStore } from '@/lib/store'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

const BodyChat = ({ messages, searchParams }: {
    messages: any, searchParams: {
        chatId: string,
        userId: string,
        userRole: string
    }
}) => {
    const setMessages = useStore((state: any) => state.setMessages)
    const setMessage = useStore((state: any) => state.setMessage)
    const context = useAppContext()
    const chatRef = useRef<HTMLDivElement | null>(null)
    const msg = useStore((state: any) => state.messages)

    useEffect(() => {
        const handleMessage = (data: any) => {
            if (searchParams.userId == data.message.sender.id) {
                setMessage(data.message)
            }
        }
        socket.on('receive-msg', handleMessage)
        return () => {
            socket.off('receive-msg')
        }
    }, [searchParams, setMessage])

    useEffect(() => {
        if (messages?.length) {
            setMessages(messages)
        }
    }, [messages, setMessages])
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [msg]);

    return (
        <div ref={chatRef} className='space-y-3  h-[calc(100svh-143px)] lg:h-[calc(100svh-(123px+63px))] overflow-auto'>
            {msg?.map((msg: any) =>
                <div key={msg.id}>
                    <div className={clsx(
                        { 'flex justify-end': msg.sender.id == context?.user?.id },
                        { 'flex justify-start': !(msg.sender.id == context?.user?.id) },
                    )}>
                        <div className={clsx(
                            'px-3 py-2 rounded-full min-w-44 max-w-72 lg:max-w-96',
                            { 'bg-blue-500 text-white ': msg.sender.id == context?.user?.id },
                            { "bg-blue-300 ": !(msg.sender.id == context?.user?.id) }
                        )}>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BodyChat