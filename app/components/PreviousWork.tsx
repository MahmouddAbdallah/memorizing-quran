'use client'
import React, { useRef, useState } from 'react'
const PreviousWork = () => {
    const videosRef = useRef<any>([])
    const handleOnPlay = (index: any) => {
        videosRef.current.filter((e: any) => e != videosRef.current[index]).map((e: any) => e.pause())
    }
    const videos = [
        {
            id: 1,
            video: './prev-1.mp4',
        },
        {
            id: 2,
            video: './prev-2.mp4',
        },
    ]
    return (
        <section id='previousWork' className='py-10 lg:py-20 p-container  bg-[#f7f8fa]'>
            <div className='pb-10'>
                <div className="text-center space-y-2">
                    <h2 className='text-blue-500 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium'>الاعمال السابقه</h2>
                    <h2 className='text-xl font-medium sm:text-xl md:text-2xl lg:text-3xl'> مقاطع مسجلة لتعليم القرآن بالتجويد</h2>
                </div>
            </div>
            <div className='grid grid-cols-12 space-y-5 sm:space-y-0 sm:gap-5 lg:gap-7 lg:pt-10 '>
                {videos.map((vid, i) => {
                    return <div key={vid.id} className='col-span-12 md:col-span-6'>
                        <video
                            onPlay={() => {
                                handleOnPlay(i)
                            }}
                            key={vid.id}
                            ref={(element: HTMLVideoElement | null) => {
                                videosRef.current[i] = element;
                            }}
                            src={vid.video}
                            controls
                            className='rounded-xl cursor-pointer border-2 border-black/50' />
                    </div>
                })}
            </div>
        </section>
    )
}

export default PreviousWork