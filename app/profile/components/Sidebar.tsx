'use client'
import Logout from '@/app/components/Logout'
import { useAppContext } from '@/app/context/appContext'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()
    const context = useAppContext()
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
            href: '/profile/quota',
        },
    ]
    return (
        !pathname.includes('chat') &&
        <div className="lg:block hidden">
            <div>
                <div className='lg:block hidden'>
                    <div className='sticky top-10 z-50 pr-20 pt-10'>
                        <div className='shadow-md rounded-xl border-2 overflow-hidden'>
                            <ul className='w-full'>
                                {items.map((item, i) => {
                                    return (
                                        !(((context?.user?.role != 'user')) && (item.name == 'فواتيرى' || item.name == "الحصص الجماعية")) &&
                                        <li className='' key={item.href}>
                                            <div>
                                                <Link
                                                    href={item.href}
                                                    className={clsx(
                                                        'block py-5 px-20 w-full',
                                                        { 'bg-primary text-white': item.href == '/profile/schedule' ? false : pathname == item.href },
                                                        { 'bg-primary text-white': pathname.includes(item.href.split('/')[2]) ? true : false },
                                                    )}
                                                >
                                                    <div className=''>
                                                        <span>{item.name}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                })}
                                <li className=''>
                                    <div className='block py-5 px-20 w-full'>
                                        <Logout />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar