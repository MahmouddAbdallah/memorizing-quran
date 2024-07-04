'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const NavSchedule = () => {
    const pathname = usePathname();
    const query = useSearchParams()
    const day = query.get('days') || 'today'
    return (
        <nav className='mt-10'>
            <div className='flex gap-3 items-center w-full justify-center'>
                <div className='px-10 py-3 border border-primary rounded-2xl flex gap-5'>
                    <Link href={`${pathname}?days=cancel`}>
                        <span className={day == 'cancel' ? 'relative flex justify-center before:content-[""] before:h-1 before:w-full before:bg-primary before:rounded-full before:absolute before:-bottom-1' : ""}>
                            <span>حصص ملغاه </span>
                        </span>
                    </Link>
                    <Link href={`${pathname}?days=sch`}>
                        <span className={day == 'sch' ? 'relative flex justify-center before:content-[""] before:h-1 before:w-full before:bg-primary before:rounded-full before:absolute before:-bottom-1' : ""}>
                            <span>جدول الحصص</span>
                        </span>
                    </Link>
                    <Link href={`${pathname}?days=today`}>
                        <span className={day == 'today' ? 'relative flex justify-center before:content-[""] before:h-1 before:w-full before:bg-primary before:rounded-full before:absolute before:-bottom-1' : ""}>
                            <span>حصص اليوم</span>
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavSchedule