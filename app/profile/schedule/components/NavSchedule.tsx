'use client'
import { useAppContext } from '@/app/context/appContext'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const NavSchedule = () => {
    const pathname = usePathname();
    const context = useAppContext()

    return (
        <nav className='mt-10'>
            <div className='flex gap-3 items-center w-full justify-center'>
                <div className='px-10 py-3 border border-primary rounded-2xl flex gap-5'>
                    <Link href={`/profile/schedule/cancel`}>
                        <span className={pathname.split('/')[3]?.includes('cancel') ? 'relative flex justify-center before:content-[""] before:h-1 before:w-full before:bg-primary before:rounded-full before:absolute before:-bottom-1' : ""}>
                            <span>حصص ملغاه </span>
                        </span>
                    </Link>
                    <Link href={`/profile/schedule/sch`}>
                        <span className={pathname.split('/')[3]?.includes('sch') ? 'relative flex justify-center before:content-[""] before:h-1 before:w-full before:bg-primary before:rounded-full before:absolute before:-bottom-1' : ""}>
                            <span>جدول الحصص</span>
                        </span>
                    </Link>
                    <Link href={`/profile/schedule`}>
                        <span className={(pathname.split('/')[2].includes('schedule') && !pathname?.split('/')[3]) ? 'relative flex justify-center before:content-[""] before:h-1 before:w-full before:bg-primary before:rounded-full before:absolute before:-bottom-1' : ""}>
                            <span>حصص اليوم</span>
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavSchedule