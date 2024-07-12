'use client'
import { translateDays } from '@/app/utils/translateDay'
import React from 'react'
import { useSchAppContext } from '../schContext/schAppContext'

const ScheduleDays = () => {
    const schContext = useSchAppContext();
    return (
        <div className='p-container py-10'>
            <div className='flex justify-end gap-5 lg:gap-10'>
                {
                    schContext?.lessons.length ?
                        schContext?.lessons.map((lesson: any) => <div
                            key={lesson.id}
                            className='w-full flex justify-center border-2 border-primary/70 rounded-lg'
                        >
                            <div className='px-5 py-10 text-center'>
                                <div >
                                    يوم {translateDays(lesson.day)}
                                </div>
                                <div>
                                    الساعه {lesson.timeSlot}
                                </div>
                                {lesson.lesson.user && <div>
                                    الطالب {lesson.lesson.user.name}
                                </div>}
                                {lesson.lesson.teacher && <div>
                                    المعلم {lesson.lesson.teacher.name}
                                </div>}
                            </div>
                        </div>
                        )
                        : <div className='w-full'>
                            <div className='w-full flex justify-center border-2 border-primary/70 rounded-lg'>
                                <div className='px-5 py-10 text-center'>
                                    <div className='text-2xl font-bold text-primary/70'>{schContext?.isLesson ?
                                        'يتم مراجعة طلبك' :
                                        'لا يوجد دراس'}</div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ScheduleDays