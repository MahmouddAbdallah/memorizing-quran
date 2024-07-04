import { translateDays } from '@/app/utils/translateDay'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ScheduleDays = ({ lessons }: { lessons: any }) => {


    return (
        <div className='p-container py-10'>
            <div className='flex justify-end gap-5 lg:gap-10'>
                {lessons.map((lesson: any) => <div
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
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default ScheduleDays