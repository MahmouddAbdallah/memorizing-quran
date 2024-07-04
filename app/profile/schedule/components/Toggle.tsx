'use client'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import Today from './Today';
import ScheduleDays from './ScheduleDays';
import CancelDays from './CancelDays';
import axios from 'axios';

const Toggle = () => {
    const query = useSearchParams();
    const day = query.get('days') || 'today'

    const [lessons, setLessons] = useState([])
    const fetchLessons = useCallback(async () => {
        try {
            if (!lessons.length) {
                const { data } = await axios.get(`/api/lesson-weak`)
                setLessons(data.lessons)
            }
        } catch (error) {
            console.error(error);
        }
    }, [lessons.length])

    useEffect(() => {
        fetchLessons()
    }, [day, fetchLessons])
    const date = () => {
        const days = lessons.map((item: { day: string, timeSlot: 'string' }) => {
            const firstChar = item.day.split("")[0].toUpperCase();
            return { day: `${firstChar}${item.day.slice(1).toLowerCase()}`, timeSlot: item.timeSlot }
        })
        if (lessons.length) {
            const today = new Date();
            const dayOfWeek = today.toLocaleDateString("en-EG", { weekday: "long" });
            const currentIndex = days.findIndex((index) => index.day == dayOfWeek)
            const nextIndex = (currentIndex + 1) % days.length;
            const nextLesson = days[nextIndex]
            const nextDay = nextLesson?.day?.toUpperCase();
            const timeSlot = nextLesson?.timeSlot;
            if (days.some(item => item.day == dayOfWeek)) {
                const timeSlot = days.filter(item => item.day == dayOfWeek)[0].timeSlot
                return { nextDay: dayOfWeek, timeSlot, dayOfWeek, bool: days.some(item => item.day == dayOfWeek) }
            }
            else
                return { nextDay, timeSlot, dayOfWeek }
        }
        else return { nextDay: "", timeSlot: "", dayOfWeek: "" }
    }

    return (
        <div>
            {
                day == 'today' ?
                    <Today
                        nextDay={date().nextDay.toUpperCase()}
                        today={date().dayOfWeek.toUpperCase()}
                        timeSlot={date().timeSlot}
                    />
                    :
                    day == 'sch' ?
                        <ScheduleDays lessons={lessons} />
                        :
                        <CancelDays />
            }
        </div>
    )
}

export default Toggle