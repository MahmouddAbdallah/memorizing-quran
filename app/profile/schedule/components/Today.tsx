'use client';
import { LiveIcon } from '@/app/components/icons'
import { isWithin10Minutes } from '@/app/utils/After10Mintue'
import Link from 'next/link'
import React from 'react'
import { useSchAppContext } from '../schContext/schAppContext'
import { translateDays } from '@/app/utils/translateDay';

const Today = ({ data }: { data: any }) => {
    const schContext = useSchAppContext()
    const date = () => {
        const days = schContext?.lessons?.map((item: { day: string, timeSlot: 'string' }) => {
            const firstChar = item.day.split("")[0].toUpperCase();
            return { day: `${firstChar}${item.day.slice(1).toLowerCase()}`, timeSlot: item.timeSlot }
        })
        if (schContext?.lessons?.length) {
            const today = new Date();
            const dayOfWeek = today.toLocaleDateString("en-EG", { weekday: "long" });
            const currentIndex = days.findIndex((index: any) => index.day == dayOfWeek)
            const nextIndex = (currentIndex + 1) % days.length;
            const nextLesson = days[nextIndex]
            const nextDay = nextLesson?.day?.toUpperCase();
            const timeSlot = nextLesson?.timeSlot;
            if (days.some((item: any) => item.day == dayOfWeek)) {
                const timeSlot = days.filter((item: any) => item.day == dayOfWeek)[0].timeSlot
                return { nextDay: dayOfWeek, timeSlot, dayOfWeek, bool: days.some((item: any) => item.day == dayOfWeek) }
            }
            else
                return { nextDay, timeSlot, dayOfWeek }
        }
        else return { nextDay: "", timeSlot: "", dayOfWeek: "" }
    }

    const timeSlot = date().timeSlot
    const nextDay = date()?.nextDay?.toUpperCase()
    const today = date()?.dayOfWeek?.toUpperCase()
    const comparisonResult = isWithin10Minutes(timeSlot)

    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekdayNames[new Date().getDay()].toLocaleUpperCase();
    const dayLessons = schContext?.lessons.filter((e: any) => day == e.day)
    return (
        <div>
            {
                schContext?.lessons?.length ?
                    <>
                        <h4 className='text-center py-5'>حصة اليوم {translateDays(day as any)} </h4>
                        <div className='text-center'>
                            <span className='block'>
                                الساعه
                            </span>
                            <span>
                                {dayLessons[0]?.timeSlot}
                            </span>
                        </div>
                    </>
                    : ""
            }
            <div className='flex items-center justify-center h-96'>
                <div className='flex flex-col items-center gap-5'>
                    <div>
                        <LiveIcon className='w-32 h-32' />
                    </div>
                    {
                        schContext?.lessons?.length ?
                            <div>
                                {(nextDay == today && comparisonResult && data.session.link) ?
                                    <Link
                                        href={data.session.link}
                                        target='blank'
                                        className='px-6 py-2 bg-blue-500 text-white rounded-md'
                                    >
                                        zoom انضم الي
                                    </Link>
                                    :
                                    <div className='px-6 py-2 bg-black/30 text-white rounded-md select-none'>
                                        zoom انضم الي
                                    </div>
                                }
                            </div>
                            : <Link
                                href={"/plans"}
                                target='blank'
                                className='px-6 py-2 bg-blue-500 text-white rounded-md'
                            >
                                اشترك الان
                            </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Today