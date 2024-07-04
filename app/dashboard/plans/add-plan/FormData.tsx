'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import quranImg from '../../../assets/quran.svg'
import ErrorMsg from '@/app/components/ErrorMsg'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { LoadingIcon } from '@/app/components/icons'
import { toast } from 'react-hot-toast'
import axios from 'axios';

const FormData = () => {
    const { register, handleSubmit, formState: { errors, isValid }, watch, reset, clearErrors } = useForm()
    const [loading, setLoading] = useState(false)
    const onSubmit = handleSubmit(async (formData) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/plan', { ...formData }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(data);
            toast.success(data?.message);
            reset()
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    })

    return (
        <form onSubmit={onSubmit} className='w-full px-5 flex justify-center'>
            <div className='w-full lg:w-[500px] px-5 pt-5 pb-10 border rounded-lg bg-white flex flex-col items-center'>
                <div className=''>
                    <Image
                        src={quranImg}
                        alt=''
                        className='w-60'
                        height={500}
                        width={500}
                    />
                </div>
                <div className='w-full px-5 space-y-5'>
                    <div className="w-full">
                        <select
                            {...register("duration",)}
                            className={clsx(
                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                            )}
                        >
                            <option value="ساعة">ساعة</option>
                            <option value="ساعة ونص"> ساعة ونص</option>
                            <option value='ساعتان'> ساعتان</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <select
                            {...register("student", {
                                validate: (value) => {
                                    if (value == watch('children')) {
                                        return "يجب ان تدخل اما اطفال او طلاب"
                                    } else {
                                        clearErrors('children')
                                    }
                                }
                            })}
                            className={clsx(
                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                                { "border-red-500": errors?.student?.message }
                            )}
                        >
                            <option value="-">فقط اطفال</option>
                            <option value="طالب واحد">طالب</option>
                            <option value="طالبان"> طالبان</option>
                            <option value="ثلاثة طلاب"> ثلاثة طلاب</option>
                        </select>
                        <ErrorMsg message={errors?.student?.message as string} />
                    </div>
                    <div className="w-full">
                        <select
                            {...register("children", {
                                validate: (value) => {
                                    if (value == watch('student')) {
                                        return "يجب ان تدخل اما طلاب او اطفال"
                                    } else {
                                        clearErrors('student')
                                    }
                                }
                            })}
                            className={clsx(
                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                                { "border-red-500": errors?.children?.message }
                            )}
                        >
                            <option value="-">فقط طلاب</option>
                            <option value="طفل واحد">طفل</option>
                            <option value="طفلان"> طفلان</option>
                            <option value="ثلاثة اطفال"> ثلاثة اطفال</option>
                        </select>
                        <ErrorMsg message={errors?.children?.message as string} />
                    </div>
                    <div className="w-full">
                        <select
                            {...register("session",)}
                            className={clsx(
                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                                { "border-red-500": errors?.email?.message }
                            )}
                        >
                            <option value="حصه في الاسبوع">حصه في الاسبوع</option>
                            <option value="حصتان في الاسبوع">حصتان في الاسبوع</option>
                            <option value="ثلاثه في الاسبوع">ثلاثه في الاسبوع</option>
                        </select>
                        <ErrorMsg message={errors?.email?.message as string} />
                    </div>
                    <div className="w-full">
                        <input
                            type="number"
                            {...register("price", { required: 'يرجي ادخال السعر' })}
                            placeholder='السعر'
                            className={clsx(
                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                                { "border-red-500": errors?.price?.message }
                            )}
                        />
                        <ErrorMsg message={errors?.price?.message as string} />
                    </div>
                    <button
                        disabled={!isValid || loading}
                        className='disabled:bg-black/10 bg-primary text-white font-medium py-3 rounded-md w-full flex justify-center items-center'
                    >
                        {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : "حفظ"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormData
