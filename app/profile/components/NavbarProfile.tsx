'use client';
import { LogoIcon, MenuIcon } from '@/app/components/icons'
import { useAppContext } from '@/app/context/appContext'
import useClickOutside from '@/app/hooks/useClickOutSide';
import { useStore } from '@/lib/store';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NavbarProfile = () => {
    const context = useAppContext()
    const setUnread = useStore((state: any) => state.setUnread)
    const unRead = useStore((state: any) => state.unRead)

    const [open, setOpen] = useState(false)
    const items = [
        {
            name: "جدول حصصى",
            href: '/profile/schedule',
        },
        {
            name: "فواتيرى",
            href: '/profile/bills',
        },
        {
            name: "حسابي",
            href: '/profile',
        },
        {
            name: "الحصص الجماعية",
            href: '/profile/tokens',
        },
    ]
    const eleRef = useClickOutside(() => setOpen(false))
    useEffect(() => {
        async () => {
            const { data } = await axios.get('/api/messages/unread-msg')
            console.log(data);

            setUnread(data.count)
        }
    }, [setUnread])
    // console.log(unRead);

    return (
        <nav className="sticky top-0 z-10 lg:block">
            <div className="py-3 p-container flex items-center justify-between shadow-md bg-[#faffff]">
                <div className='hidden lg:block' />
                <div ref={eleRef}>
                    <div className=' lg:hidden' >
                        <MenuIcon open={open} onClick={() => setOpen(!open)} />
                    </div>
                    <div className={`fixed bottom-0 lg:hidden left-0 h-[calc(100vh-88px)] w-64 sm:w-96 bg-white z-50 ${open ? 'rtl' : 'ltr'}`}>
                        <div className='text-gray-800 font-[500] bg-primary/50 h-full'>
                            {items.map(item => {
                                return (
                                    <Link
                                        className='py-5 flex justify-center border-b border-white hover:bg-white/15 duration-300'
                                        key={item.href}
                                        href={item.href}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <div className='flex gap-5'>
                        {context?.user?.role == 'admin' &&
                            <Link className='block' href={'/dashboard'}>لوحة التحكم</Link>
                        }
                        <Link className='block' href={'/plans'}>
                            الخطط
                        </Link>
                        <Link className='flex relative' href={'/profile/chat'}>
                            الرسائل
                            {unRead ? <div className='absolute -top-1 -right-1 size-3 rounded-full bg-red-500'>
                                {/* {unRead} */}
                            </div> : ""}
                        </Link>
                    </div>
                    <Link className="block" href={context?.user?.role == 'admin' ? "/" : "/profile/schedule"}>
                        <LogoIcon className="w-16 h-16 md:w-16 md:h-16" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarProfile