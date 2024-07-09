'use client';
import { LogoIcon, MenuIcon } from '@/app/components/icons'
import { useAppContext } from '@/app/context/appContext'
import useClickOutside from '@/app/hooks/useClickOutSide';
import Link from 'next/link'
import React, { useState } from 'react'

const NavbarProfile = () => {
    const context = useAppContext()
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
                <div className="flex gap-5">
                    <Link className="block" href={context?.user ? "/profile/schedule" : "/"}>
                        <LogoIcon className="w-16 h-16 md:w-16 md:h-16" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarProfile