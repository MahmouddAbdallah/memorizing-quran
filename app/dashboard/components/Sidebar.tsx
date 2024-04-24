'use client'
import { LogoIcon, MenuIcon } from '@/app/components/icons'
import useClickOutside from '@/app/hooks/useClickOutSide'
import Link from 'next/link'
import React, { useState } from 'react'

const Sidebar = () => {
    // const context = useAppContext()
    const [open, setOpen] = useState(false)
    const refElement = useClickOutside(() => setOpen(false))

    return (
        <div className=''>
            <div className='bg-[#cacaca25] flex lg:hidden justify-between px-5 py-5 bg-white'>
                <div ref={refElement}>
                    <MenuIcon onClick={() => { setOpen(!open) }} open={open} />
                </div>
                <div className=' flex items-center gap-3'>
                    <Link href={'/'}><LogoIcon className='w-11 h-11 stroke-[5px]' /></Link>
                </div>
            </div>
            <div className={`${open ? 'rtl' : 'ltr'} shadow-md py-10 w-56 lg:w-64 lg:flex flex-col items-center h-screen space-y-10 fixed lg:sticky top-0 z-50 bg-white`}>
                <div className='flex justify-center'>
                    <Link href={'/'}><LogoIcon className='' /></Link>
                </div>
                <ul className='w-full'>
                    <li className=''>
                        <div>
                            <Link href={'/dashboard/plans'} className='block py-3 px-5 w-full border-y-2 '>الخطط</Link>
                        </div>
                        <ul className='shadow-inner shadow-primary/20 '>
                            <li>
                                <Link
                                    href={'/dashboard/plans/add'}
                                    className='block text-sm text-black/70 py-3 px-5 w-full border-b hover:text-green-500 duration-150'>
                                    اضافة خطة
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className=''>
                        <div>
                            <Link href={'/dashboard/token'} className='block py-3 px-5 w-full border-y-2 '>انشاء كود</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar