'use client';
import { DeleteIcon, EditIcon } from '@/app/components/icons'
import React, { useState } from 'react'
import AddTeacher from './AddTeacher';
import AddDays from './AddDays';
import { translateDays } from '@/app/utils/translateDay';

const LessonTable = ({ lessons }: { lessons: any }) => {
    const [open, setOpen] = useState(false)
    const [openDay, setopenDay] = useState(false)
    const [teacher, setTeacher] = useState('')
    const [lessonId, setLessonId] = useState('')
    const [lessonData, setLessonData] = useState({ session: "", duration: "" })
    const [lessonWeekData, setLessonWeekData] = useState([])

    return (
        <div className="w-full">
            <table className="w-full text-sm text-right whitespace-nowrap">
                <thead>
                    <tr className='text-center'>
                        <th scope="col" className="border-2 py-3 px-10">ايام</th>
                        <th scope="col" className="border-2 py-3 px-10">الطلاب</th>
                        <th scope="col" className="border-2 py-3 px-10">المعلم</th>
                        <th scope="col" className="border-2 py-3 px-10">عدد</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons?.map((lesson: any, i: number) => {
                        return (
                            <tr key={lesson.id} className='text-center'>
                                <td className='border-b-2 border-x-2 py-2 px-10 text-center'>
                                    {lesson.LessonWeak ?
                                        <div className='flex justify-center'>
                                            <button
                                                className='group w-32 flex justify-center'
                                                onClick={() => {
                                                    setLessonWeekData(lesson.LessonWeak)
                                                    setopenDay(true)
                                                    setLessonId(lesson.id)
                                                    setLessonData({
                                                        session: lesson.session,
                                                        duration: lesson.duration
                                                    })
                                                }}>
                                                <span className='group-hover:hidden'>
                                                    {lesson.LessonWeak.map((weak: any) => ` ${translateDays(weak.day)}`)}
                                                </span>
                                                <EditIcon className='hidden -translate-y-1 group-hover:block group-hover:translate-y-0 w-4 h-4 duration-150 stroke-blue-500' />
                                            </button>
                                        </div>
                                        : <button onClick={() => {
                                            setopenDay(true)
                                            setLessonId(lesson.id)
                                            setLessonData({
                                                session: lesson.session,
                                                duration: lesson.duration
                                            })
                                        }}>
                                            اضف ايام
                                        </button>
                                    }
                                </td>
                                <td className='border-b-2 border-x-2 py-2 px-10'>{lesson?.user?.name}</td>
                                <td className='border-b-2 border-x-2 py-2 px-10 text-center w-fit'>
                                    <div className='flex justify-center'>
                                        {
                                            (lesson?.teacher?.name ?
                                                <button
                                                    className='group w-32 flex justify-center'
                                                    onClick={() => {
                                                        setOpen(!open)
                                                        setLessonId(lesson.id)
                                                        setTeacher(lesson?.teacher.name)
                                                    }}>
                                                    <span className='group-hover:hidden'>
                                                        {teacher ? teacher : lesson?.teacher?.name}
                                                    </span>
                                                    <EditIcon className='hidden -translate-y-1 group-hover:block group-hover:translate-y-0 w-4 h-4 duration-150 stroke-blue-500 ' />
                                                </button>
                                                :
                                                <button onClick={() => {
                                                    setOpen(!open)
                                                    setLessonId(lesson.id)
                                                }}>
                                                    اضف معلم
                                                </button>
                                            )}
                                    </div>
                                </td>

                                <td className='border-b-2 border-x-2 py-2 px-3'>{i + 1}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {open &&
                <AddTeacher
                    teacher={teacher}
                    lessonId={lessonId}
                    setTeacher={setTeacher}
                    setOpen={setOpen} />
            }
            {openDay &&
                <AddDays
                    duration={lessonData.duration}
                    session={lessonData.session}
                    lessonId={lessonId}
                    setOpen={setopenDay}
                    lessonWeekData={lessonWeekData}
                />
            }
        </div>
    )
}

export default LessonTable