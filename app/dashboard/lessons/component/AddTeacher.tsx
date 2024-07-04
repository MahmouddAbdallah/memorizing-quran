import UserIcon from '@/app/components/UserIcon';
import { CloseIcon, LoadingIcon } from '@/app/components/icons';
import useClickOutside from '@/app/hooks/useClickOutSide';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

const AddTeacher = ({ setOpen, setTeacher, lessonId, teacher }: {
    lessonId: string;
    teacher: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTeacher: React.Dispatch<React.SetStateAction<string>>
}) => {
    const [keyword, setKeyword] = useState(teacher ? teacher : "");
    const [teachers, setTeachers] = useState([]);
    const eleRef = useClickOutside(() => setOpen(false))
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(false)
    const [teacherId, setTeacherId] = useState('')
    const [active, setActive] = useState(false)
    const fechTeachersKeyword = useCallback(
        async () => {
            try {
                if (hide) {
                    if (keyword) {
                        const { data } = await axios.get(`/api/teacher?keyword=${keyword}`);
                        setTeachers(data.teachers);
                        setActive(false)
                    } else {
                        setTeachers([])
                        setHide(false)
                    }
                } else {
                    setHide(false)
                    setTeachers([])
                }
            } catch (error: any) {
                console.error(error);
                toast.error(error?.response?.data?.message || 'There is an error');
            }
        }, [hide, keyword]
    )

    useEffect(() => {
        fechTeachersKeyword()
    }, [fechTeachersKeyword])

    const updateLesson = async () => {
        try {
            setLoading(true)
            await axios.put(`/api/lesson/${lessonId}`, {
                teacherId
            })
            setOpen(false)
            setTeacher(keyword)
            setLoading(false)
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false)
        }
    }
    return (
        <div className='fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/20 z-50'>
            <div ref={eleRef} className='w-96 bg-white rounded-md'>
                <div className='space-y-3'>
                    <div className='w-full flex justify-between py-3 border-b-2 px-2'>
                        <button
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon className='w-5 h-5' />
                        </button>
                        <h6>
                            اضف معلم
                        </h6>
                    </div>
                    <div className='px-2 relative flex justify-center'>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value)
                                setHide(true)
                            }}
                            className='w-full border outline-none py-1 px-2 rounded-md text-right'
                            placeholder='....ابحث عن المعلم'
                        />
                        {hide && <div className='absolute w-full bg-white/90 border top-10 rounded-md py-2 px-2'>
                            {teachers.map((teacher: any) => {
                                return (
                                    <button
                                        onClick={() => {
                                            setKeyword(teacher.name)
                                            setTeacherId(teacher.id)
                                            setHide(false)
                                            setActive(true)
                                        }}
                                        className='w-full flex justify-end' key={teacher.id}>
                                        <div className='flex items-center gap-2'>
                                            {teacher.name}
                                            <UserIcon
                                                className='w-9 h-9'
                                                name={teacher.name}
                                            />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>}
                    </div>
                    <div className='w-full px-2 pb-3'>
                        <button
                            onClick={updateLesson}
                            disabled={!active}
                            className='w-full mt-1 rounded-md bg-blue-500 disabled:bg-blue-300 text-white py-1'>
                            {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : "اضف"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTeacher