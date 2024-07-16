'use client'
import React, { useState } from 'react'
import { MenuIcon, PersonCircleIcon } from './icons'
import useClickOutside from '../hooks/useClickOutSide'
import Link from 'next/link'
import { useAppContext } from '../context/appContext'

const Menu = () => {
    const [open, setOpen] = useState(false)
    const handleopen = () => {
        setOpen(!open)
        // if (open) document.body.style.overflowY = 'auto';
        // else document.body.style.overflowY = 'hidden';
    }
    const context = useAppContext()
    const refElement = useClickOutside(() => setOpen(false))
    return (
        <div ref={refElement} className="block md:hidden">
            <div>
                <MenuIcon onClick={handleopen} open={open} />
            </div>
            <div className={`fixed bottom-0 left-0 h-[calc(100vh-88px)] w-64 sm:w-96 bg-white z-50 ${open ? 'rtl' : 'ltr'}`}>
                <div className='text-gray-800 font-[500] bg-primary/50 h-full'>
                    <div className="flex h-full pb-10 items-center flex-col justify-between">
                        <div className="w-full">
                            <Link
                                onClick={handleopen}
                                href={"/profile/schedule"}
                                className='py-5 flex items-center gap-3 justify-center border-b border-white hover:bg-white/15 duration-300'
                            >
                                <PersonCircleIcon className="w-8 h-8" />
                                <span>{context?.user?.name.split(" ")[0]}</span>
                            </Link>
                            <Link
                                onClick={handleopen}
                                href={"/"}
                                className='py-5 flex justify-center border-b border-white hover:bg-white/15 duration-300'
                            >
                                الصفحة الرئيسية
                            </Link>
                            <Link
                                onClick={handleopen}
                                href={"/#previousWork"}
                                className='py-5 flex justify-center border-b border-white hover:bg-white/15 duration-300'>
                                الاعمال السابقه
                            </Link>
                            {
                                context?.user?.role == 'admin' &&
                                <Link
                                    onClick={handleopen}
                                    href={"/dashboard"}
                                    className='py-5 flex justify-center border-b border-white hover:bg-white/15 duration-300'>
                                    لوحة التحكم
                                </Link>
                            }
                        </div>
                        <div className=' flex gap-3'>
                            {
                                context?.user ?
                                    ""
                                    :
                                    <>
                                        <Link
                                            onClick={handleopen}
                                            href={'/sign-up'}
                                            className=" px-5 whitespace-nowrap bg-blue-500 rounded-md py-2 text-white">
                                            انضم الينا
                                        </Link>
                                        <Link
                                            onClick={handleopen}
                                            href={'/sign-in'}
                                            className=" px-5 whitespace-nowrap bg-black rounded-md py-2 text-white">
                                            سجل الان
                                        </Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu