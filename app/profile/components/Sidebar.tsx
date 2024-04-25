'use client'
import { ArrowDown, ArrowUp, LogoIcon, MenuIcon } from '@/app/components/icons'
import useClickOutside from '@/app/hooks/useClickOutSide'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Sidebar = () => {
    // const context = useAppContext()
    const [open, setOpen] = useState(false)
    const refElement = useClickOutside(() => setOpen(false))
    const pathname = usePathname()
    const [href, setHref] = useState('')

    const items = [
        {
            name: "جدول حصصى",
            href: 'schedule',
        },
        {
            name: "دوراتي",
            href: 'tokens',
        },
        {
            name: "فواتيرى",
            href: 'tokens',
        },
        {
            name: "الحصص الجماعية",
            href: 'tokens',
        },
        {
            name: "حسابي",
            href: 'tokens',
        },
    ]

    return (
        <div className='h-[70svh] sticky top-32 z-50 pr-20'>
            <div className='  shadow-md py-5 rounded-xl border-2'>
                <ul className='w-full'>
                    {items.map((item, i) => {
                        return (
                            <li className='' key={item.href}>
                                <div>
                                    <Link
                                        href={`/profile/${item.href}`}
                                        className={`block py-3 px-20 w-full bg-black/5 {i == 0 ? "border-y-2" : "border-b-2"}`}
                                        onClick={() => { setHref(href == item.href ? "" : item.href) }}
                                    >
                                        <div className=''>
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar