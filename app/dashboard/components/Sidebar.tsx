'use client'
import { ArrowDown, ArrowUp, LogoIcon, MenuIcon } from '@/app/components/icons'
import { useAppContext } from '@/app/context/appContext'
import useClickOutside from '@/app/hooks/useClickOutSide'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const refElement = useClickOutside(() => setOpen(false))
    const pathname = usePathname()
    const [href, setHref] = useState('')
    const context = useAppContext()
    const items = [
        {
            name: "الخطط",
            href: 'plans',
            subPage: [
                {
                    name: "اضافة خطة",
                    href: 'add-plan'
                }
            ]
        },
        {
            name: "الاكواد",
            href: 'tokens',
            subPage: [
                {
                    name: "انشاء كود",
                    href: 'add-token'
                }
            ]
        },
        {
            name: "الاحصص",
            href: 'lessons',
            subPage: [
                {
                    name: "الحصص الجديدة",
                    href: 'view-new-lesson'
                }
            ]
        },
        {
            name: "المعلمين",
            href: 'teachers',
            subPage: [
                {
                    name: "اضافة معلم",
                    href: 'add-teacher'
                }
            ]
        },
    ]

    return (
        <div ref={refElement} className=''>
            <div className='bg-[#cacaca25] flex lg:hidden justify-between px-5 py-5 bg-white'>
                <div >
                    <MenuIcon onClick={() => { setOpen(!open) }} open={open} />
                </div>
                <div className=' flex items-center gap-3'>
                    <Link href={context?.user ? "/profile/schedule" : "/"}><LogoIcon className='w-11 h-11 stroke-[5px]' /></Link>
                </div>
            </div>
            <div className={`${open ? 'rtl' : 'ltr'} shadow-md py-10 w-56 lg:w-64 lg:flex flex-col items-center h-screen space-y-10 fixed lg:sticky top-0 z-50 bg-white`}>
                <div className='flex justify-center'>
                    <Link href={context?.user ? "/profile/schedule" : "/"}><LogoIcon className='' /></Link>
                </div>
                <ul className='w-full'>
                    {items.map((item, i) => {
                        return (
                            <li className='' key={item.href}>
                                <div>
                                    <Link
                                        href={`/dashboard/${item.href}`}
                                        className={clsx(
                                            `block py-3 px-5 w-full ${i == 0 ? "border-y-2" : "border-b-2"}`,
                                            { 'bg-primary text-white': pathname.includes(item.href) }
                                        )}
                                        onClick={() => { setHref(href == item.href ? "" : item.href) }}
                                    >
                                        <div className='flex justify-between'>
                                            {
                                                item.subPage ?
                                                    <div>
                                                        {href == item.href ? <ArrowUp className='w-5 h-5' /> : <ArrowDown className='w-5 h-5' />}
                                                    </div>
                                                    :
                                                    <div />
                                            }
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </div>
                                {
                                    item.subPage &&
                                    <ul className='shadow-inner shadow-primary/20 '>
                                        {item.subPage.map(sub =>
                                            (sub.href == pathname.split('/')[3] || href == item.href) &&
                                            <li key={sub.href}>
                                                <Link
                                                    href={`/dashboard/${item.href}/${sub.href}`}
                                                    className='block text-sm text-black/70 py-3 px-5 w-full border-b hover:text-green-500 duration-150'>
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar