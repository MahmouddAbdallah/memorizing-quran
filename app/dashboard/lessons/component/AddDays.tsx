import UserIcon from '@/app/components/UserIcon';
import { CloseIcon, LoadingIcon } from '@/app/components/icons';
import useClickOutside from '@/app/hooks/useClickOutSide';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const AddDays = ({ setOpen, lessonWeekData, lessonId, session }: {
    lessonId: string;
    session: string;
    duration: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    lessonWeekData?: any
}) => {
    const eleRef = useClickOutside(() => setOpen(false))
    const days = [{ name: 'الاحد', value: 'SUNDAY' }, { name: 'الاثنين', value: 'MONDAY' }, { name: 'الثلاثاء', value: 'TUESDAY' }, { name: 'الاربعاء', value: 'WEDNESDAY' }, { name: 'الخميس', value: 'THURSDAY' }, { name: 'الجمعة', value: 'FRIDAY' }, { name: 'السبت', value: 'SATURDAY' },]
    const limit = session == 'حصه في الاسبوع' ? 1 : session == 'حصتان في الاسبوع' ? 2 : 3
    const [data, setData] = useState<any>(lessonWeekData ? lessonWeekData : [])
    const [switchBtn, setSwitchBtn] = useState(lessonWeekData ? true : false)
    const [loading, setLoading] = useState(false);

    const createWeakDays = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/lesson-weak', data)
            toast.success(res.data.message as string)
            setOpen(false)
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    }

    const updateWeakDays = async () => {
        try {
            setLoading(true);
            const newData = data.map((item: any) => {
                const selectedTime = item.timeSlot;
                const [hours, minutes] = selectedTime.split(':');
                let period = 'AM';
                let hour = parseInt(hours, 10);
                if (hour === 0) {
                    hour = 12; // 12 AM
                } else if (hour === 12) {
                    period = 'PM'; // 12 PM
                } else if (hour > 12) {
                    hour -= 12;
                    period = 'PM';
                }
                const formattedTime = `${hour}:${minutes} ${period}`;
                return { ...item, timeSlot: formattedTime }
            })
            const res = await axios.put('/api/lesson-weak', { data: newData, oldData: lessonWeekData })
            toast.success(res.data.message as string)
            setOpen(false)
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/20 z-50 px-5 md:px-0'>
            <div ref={eleRef} className='w-full md:w-[550px] bg-white rounded-md'>
                <div className='space-y-3'>
                    <div className='w-full flex justify-between py-3 border-b-2 px-2'>
                        <button
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon className='w-5 h-5' />
                        </button>
                        <h6>
                            اضف {session}
                        </h6>
                    </div>
                    <div>
                        <div className=''>
                            {
                                days.map((item) => {

                                    const timeSlot = () => {
                                        if (data.some((i: any) => i.day === item.value)) {
                                            const selectedTime = data.find((i: any) => i.day === item.value).timeSlot

                                            const [time, period] = selectedTime.split(' ');
                                            const [hoursStr, minutesStr] = time.split(':');
                                            let hours = parseInt(hoursStr, 10);
                                            const minutes = parseInt(minutesStr, 10);

                                            if (period === 'PM' && hours < 12) {
                                                hours += 12;
                                            } else if (period === 'AM' && hours === 12) {
                                                hours = 0;
                                            }

                                            const hours24 = hours.toString().padStart(2, '0');
                                            const minutes24 = minutes.toString().padStart(2, '0');
                                            return `${hours24}:${minutes24}`;
                                        }
                                        else
                                            return ""
                                    }

                                    return (
                                        <div key={item.value}>
                                            <div className='w-full flex items-center justify-between px-3 py-2'>
                                                <div>
                                                    <input
                                                        lang='ar'
                                                        type="time"
                                                        disabled={(limit == data?.length && !data.some((el: any) => el.day == item.value))}
                                                        value={timeSlot()}
                                                        onChange={(e) => {
                                                            setData((prev: any) => {
                                                                if (prev?.some((el: any) => (el.day == item.value))) {
                                                                    const filterDays = prev.filter((el: any) => el.day != item.value)
                                                                    return [...filterDays, { day: item.value, timeSlot: e.target.value, lessonId }]
                                                                }
                                                                else {
                                                                    return [...prev, { day: item.value, timeSlot: e.target.value, lessonId }]
                                                                }
                                                            })
                                                        }}
                                                        className='outline-none border-2 p-1 rounded-md disabled:text-black/50'
                                                    />
                                                </div>
                                                <label className='flex gap-2'>
                                                    <div>
                                                        <span
                                                            className={(limit == data?.length && !data.some((el: any) => el.day == item.value)) ? "text-black/50" : ""}
                                                        >{item.name}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='px-2 py-3'>
                            {
                                lessonWeekData?.length ?
                                    <>
                                        {
                                            switchBtn ?
                                                <button
                                                    className='bg-blue-500 text-white disabled:bg-blue-300 w-full py-2 rounded-md flex items-center justify-center'
                                                    onClick={() => {
                                                        setData([])
                                                        setSwitchBtn(!switchBtn)
                                                    }}>
                                                    <span>
                                                        تعديل
                                                    </span>
                                                </button> :
                                                <button
                                                    onClick={updateWeakDays}
                                                    disabled={!(limit == data?.length)}
                                                    className='bg-blue-500 disabled:bg-blue-300 w-full py-2 rounded-md flex items-center justify-center'>
                                                    <span className='text-white'>
                                                        {loading ?
                                                            <LoadingIcon className='w-6 h-6 animate-spin' /> :
                                                            <span>
                                                                حفظ
                                                            </span>
                                                        }
                                                    </span>
                                                </button>
                                        }
                                    </>
                                    :
                                    <button
                                        onClick={createWeakDays}
                                        disabled={!(limit == data?.length)}
                                        className='bg-blue-500 disabled:bg-blue-300 w-full py-2 rounded-md flex items-center justify-center'>
                                        <span className='text-white'>
                                            {loading ?
                                                <LoadingIcon className='w-6 h-6 animate-spin' /> :
                                                <span>
                                                    حفظ
                                                </span>
                                            }
                                        </span>
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDays