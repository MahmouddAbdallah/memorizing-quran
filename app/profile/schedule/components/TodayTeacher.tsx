'use client'
import { LoadingIcon, PlusIcon } from '@/app/components/icons';
import { translateDays } from '@/app/utils/translateDay';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSchAppContext } from '../schContext/schAppContext';

const TodayTeacher = () => {
    const schContext = useSchAppContext();
    const [addLink, setAddLink] = useState('')
    const [user, setUser] = useState('')
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false);
    const [isLink, setIsLink] = useState('')
    const [sessionId, setSessionId] = useState("")

    const saveSession = async () => {
        try {
            const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            if (regex.test(link)) {
                if (isLink) {
                    setLoading(true)
                    const { data } =
                        await axios.put(`/api/session/${sessionId}`, {
                            link: link,
                        })
                    toast.success(data.message)
                    setAddLink("")
                    setIsLink("")
                    setLink(data.session.link)
                    setLoading(false);
                } else {
                    setLoading(true)
                    const { data } =
                        await axios.post('/api/session', {
                            link: link,
                            userId: user,
                            lessonWeakId: addLink
                        })
                    toast.success(data.message)
                    setAddLink('')
                    schContext?.setLessons((prev: any) => {
                        prev.find((ele: any) => ele.id == addLink).session.push(data.session)
                        return prev
                    })
                    setLoading(false);
                }
            } else {
                toast.error('رابط غير صحیح')
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    }
    const date = new Date()
    const today = date.getDay()

    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekdayNames[today].toLocaleUpperCase();
    const dayLessons = schContext?.lessons.filter((e: any) => day == e.day)

    return (
        <div className='p-container'>
            <h4 className='text-center py-5'>اليوم {translateDays(day as any)}</h4>
            <div className='overflow-auto'>
                <table className="w-full text-sm text-right whitespace-nowrap">
                    <thead>
                        <tr className='text-center'>
                            {(link && (link != isLink) && addLink) && <th scope="col" className="border-2 py-3 px-3">تعديل</th>}
                            <th scope="col" className="border-2 py-3 px-3">اضف zoom link</th>
                            <th scope="col" className="border-2 py-3 px-10">الوقت</th>
                            <th scope="col" className="border-2 py-3 px-10">الاسم</th>
                            <th scope="col" className="border-2 py-3 px-10">العدد</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dayLessons?.length ?
                                dayLessons?.map((lesson: any, i: any) => {
                                    const sessionLink = lesson?.session[0]?.link
                                    return (
                                        <tr key={lesson.id} className='text-center'>
                                            {(link && (link != isLink)) &&
                                                <>
                                                    {addLink == lesson.id &&
                                                        <td className='border-b-2 border-x-2 py-2 px-10'>
                                                            <button
                                                                onClick={saveSession}
                                                                className='text-blue-500'>
                                                                {
                                                                    loading ?
                                                                        <LoadingIcon className='size-5 animate-spin' />
                                                                        :
                                                                        "حفظ"
                                                                }
                                                            </button>
                                                        </td>
                                                    }
                                                </>
                                            }
                                            <td className='border-b-2 border-x-2'>
                                                {(addLink == lesson.id) ?
                                                    <div className='flex gap-2 px-2'>
                                                        {
                                                            <input
                                                                placeholder='...اضف الرابط'
                                                                value={link}
                                                                onChange={(e) => setLink(e.target.value)}
                                                                className='w-full h-full py-1 outline-none border'
                                                                type="text"
                                                            />
                                                        }
                                                    </div>
                                                    :
                                                    <div className="w-full">
                                                        {
                                                            (link || sessionLink) ?
                                                                <input
                                                                    onClick={() => {
                                                                        setAddLink(lesson.id)
                                                                        setLink(sessionLink)
                                                                        setIsLink(sessionLink)
                                                                        setSessionId(lesson.session[0].id)
                                                                    }}
                                                                    placeholder='...اضف الرابط'
                                                                    value={link ? link : sessionLink}
                                                                    className='w-full h-full py-1 outline-none border cursor-pointer'
                                                                    type="text" />
                                                                :
                                                                <button
                                                                    onClick={() => {
                                                                        setUser(lesson.lesson.user.id)
                                                                        setAddLink(lesson.id)
                                                                    }}
                                                                    className='w-full flex justify-center group '>
                                                                    <PlusIcon className='w-4 h-4 group-hover:stroke-blue-500 duration-150' />
                                                                </button>
                                                        }
                                                    </div>
                                                }
                                            </td>
                                            <td className='border-b-2 border-x-2 py-2 px-10'>
                                                {lesson.timeSlot}
                                            </td>
                                            <td className='border-b-2 border-x-2 '>
                                                {lesson.lesson.user.name}
                                            </td>
                                            <td className='border-b-2 border-x-2 '>
                                                {i + 1}
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td colSpan={8} className='border-b-2 border-x-2 py-5 px-3 text-center' >لا يوجد بيانات</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {/* {dayLessons && dayLessons.map((lesson: any) => ( */}
            </div>
        </div>
    )
}

export default TodayTeacher