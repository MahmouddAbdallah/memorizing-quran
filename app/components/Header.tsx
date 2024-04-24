import Image from 'next/image'
import hero from '../assets/hero.png'
import Link from 'next/link'
import { WhatSappIcon } from './icons'

const Header = () => {
    return (
        <div className='bg-primary pt-16 pb-9 p-container '>
            <div className='grid grid-cols-12 lg:items-center lg:gap-5 '>
                <div className='col-span-12 lg:col-span-6 flex justify-center items-center'>
                    <Image
                        className=""
                        src={hero}
                        alt="Next.js Logo"
                        width={550}
                        height={550}
                        priority
                    />
                </div>
                <div className='col-span-12 lg:col-span-6 flex flex-col items-end gap-3 mt-10 lg:mt-0'>
                    <div className='bg-white px-2 text-sm py-1 rounded-full w-fit'>
                        مرحبا بكم في
                    </div>
                    <div className='space-y-1 md:space-y-2 lg:space-y-3'>
                        <h3 className='text-xl md:text-[33px] leading-8 lg:leading-[50px] text-white'>
                            تحفيظ القرآن الكريم بأحكام التجويد
                        </h3>
                        <h3 className='text-xl md:text-[33px] leading-8 lg:leading-[50px] text-white'>
                            برامج حفظ متنوعة تناسب المراحل العمرية
                        </h3>
                    </div>
                    <Link href="https://wa.me/+2001095925597" target="_blank" className="flex items-center gap-2 mt-3 px-5 bg-green-500 rounded-md py-2 text-white">
                        <WhatSappIcon className='fill-white w-5 h-5' />
                        <span>تواصل معنا</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header