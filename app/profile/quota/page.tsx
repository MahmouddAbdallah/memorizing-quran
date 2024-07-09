import { LiveIcon } from '@/app/components/icons'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex items-center justify-center h-96'>
            <div className='flex flex-col items-center gap-5'>
                <div>
                    <LiveIcon className='w-32 h-32' />
                </div>
                {false ?
                    <Link
                        href={""}
                        target='blank'
                        className='px-6 py-2 bg-blue-500 text-white rounded-md'
                    >
                        zoom انضم الي
                    </Link>
                    :
                    <div className='px-6 py-2 bg-black/30 text-white rounded-md select-none'>
                        لا يوجد حصص بعد
                    </div>
                }
            </div>
        </div>
    )
}

export default page