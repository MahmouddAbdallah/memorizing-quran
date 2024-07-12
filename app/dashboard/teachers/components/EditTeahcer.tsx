import ErrorMsg from '@/app/components/ErrorMsg';
import { CalendarIcon, EyeIcon, EyeOffIcon, LoadingIcon } from '@/app/components/icons';
import useClickOutside from '@/app/hooks/useClickOutSide';
import { countryList } from '@/app/utils/CountriesNames';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EditTeahcer = ({ teacher, setOpen }: { teacher: any, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { register, formState: { errors, isValid }, watch, handleSubmit, clearErrors, reset, setError } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPassConfirm, setShowPassConfirm] = useState(false);
    const [date, setDate] = useState(teacher?.date);
    const [gender, setGender] = useState(teacher?.gender)
    const today = new Date().toISOString().split('T')[0];

    const onSubmit = handleSubmit(async (formData: any) => {
        try {
            const allData = { ...formData, date }
            setLoading(true);
            const { data } = await axios.put(`/api/teacher/${teacher.id}`, { ...allData })
            toast.success(data.message)
            setLoading(false);
            window.location.reload()
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    })
    const eleRef = useClickOutside(() => setOpen(false))
    return (
        <div className='w-svw h-svh fixed top-0 left-0 bg-black/20 flex items-center justify-center p-contanier z-50'>
            <div ref={eleRef} className="w-full md:w-[500px] lg:w-[700px] bg-white rounded-md p-3">
                <form onSubmit={onSubmit}>
                    <div>
                        <div className='flex justify-center py-2'>
                            تعديل الحساب
                        </div>
                        <div className='space-y-2 lg:space-y-8'>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className="w-full">
                                    <input
                                        type="email"
                                        {...register("email", {

                                            value: teacher?.email
                                        })}
                                        placeholder='البريد الالكتروني'
                                        className={clsx(
                                            'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                            { "border-red-500": errors?.email?.message }
                                        )}
                                    />
                                    <ErrorMsg message={errors?.email?.message as string} />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        {...register("name", {

                                            value: teacher?.name
                                        },)}
                                        placeholder='الاسم'
                                        className={clsx(
                                            'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                            { "border-red-500": errors?.name?.message }
                                        )}
                                    />
                                    <ErrorMsg message={errors?.name?.message as string} />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className="w-full">
                                    <div className='w-full relative flex justify-start items-center'>
                                        <input
                                            type="text"
                                            pattern='^(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$'
                                            value={date}
                                            onChange={(e) => {
                                                setDate(e.target.value)
                                                if (errors?.date?.message) {
                                                    clearErrors("date");
                                                }
                                            }}
                                            placeholder={`${today} تاريخ الميلاد`}
                                            className={clsx(
                                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                                { "border-red-500": errors?.date?.message }
                                            )}
                                            title="الرجاء إدخال التاريخ بالصيغة الصحيحة: يوم-شهر-سنه"
                                        />
                                        <div className='absolute left-4'>
                                            <div className='relative flex items-center'>
                                                <input
                                                    type="date"
                                                    onChange={(e) => {
                                                        setDate(e.target.value)
                                                        if (errors?.date?.message) {
                                                            clearErrors("date");
                                                        }
                                                    }}
                                                    className='w-5 outline-none opacity-0 z-10'
                                                />
                                                <CalendarIcon className='absolute w-5 h-5 z-0' />
                                            </div>
                                        </div>
                                    </div>
                                    <ErrorMsg message={errors?.date?.message as string} />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        {...register("phone", {

                                            value: teacher?.phone
                                        })}
                                        placeholder='رقم الهاتف'
                                        className={clsx(
                                            'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                            { "border-red-500": errors?.phone?.message }
                                        )}
                                    />
                                    <ErrorMsg message={errors?.phone?.message as string} />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className="w-full space-y-3">
                                    <div>
                                        <span className='text-primary font-medium'>*النوع</span>
                                    </div>
                                    <div className='flex gap-4 w-full justify-end'>
                                        <label className='flex items-center gap-2'>
                                            <span className='block'>أنثى</span>
                                            <input
                                                checked={gender == 'female' ? true : false}
                                                type="radio"
                                                {...register('gender', {
                                                })}
                                                value={'female'}
                                                onChange={(e) => {
                                                    setGender(e.target.value)
                                                    if (errors?.gender?.message) {
                                                        clearErrors("gender");
                                                    }
                                                }}
                                                className='cursor-pointer sr-only peer'
                                            />
                                            <div className='radio-style' />
                                        </label>
                                        <label className='flex items-center gap-2'>
                                            <span className='block'>ذكر</span>
                                            <input
                                                checked={gender == 'male' ? true : false}
                                                type="radio"
                                                {...register('gender', {
                                                })}
                                                value={'male'}
                                                onChange={(e) => {
                                                    setGender(e.target.value)
                                                    if (errors?.gender?.message) {
                                                        clearErrors("gender");
                                                    }
                                                }}
                                                className='cursor-pointer sr-only peer'
                                            />
                                            <div className='radio-style' />
                                        </label>
                                    </div>
                                    <ErrorMsg message={errors?.gender?.message as string} />
                                </div>
                                <div className='w-full'>
                                    <select
                                        {...register('country', {

                                            value: teacher?.country
                                        })}
                                        className={clsx(
                                            'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                            { "border-red-500": errors?.country?.message }
                                        )}
                                    >
                                        <option value=''>الدولة</option>
                                        {countryList.map(country =>
                                            <option value={country} key={country}>{country}</option>
                                        )}
                                    </select>
                                    <ErrorMsg message={errors?.country?.message as string} />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className="w-full">
                                    <div className="w-full relative flex flex-col justify-center">
                                        <input
                                            disabled={loading}
                                            type={showPassConfirm ? 'text' : 'password'}
                                            placeholder='تأكيد كلمة المرور الجديدة'
                                            className={clsx(
                                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                                { "border-red-500": errors?.confirmPassword?.message }
                                            )}
                                            {...register('confirmPassword', {

                                                validate: (val: any) => {
                                                    if (watch('password') != val) {
                                                        return "كلمة المرور لا تتطابق";
                                                    }
                                                }
                                            })}
                                        />
                                        <div onMouseDown={() => { setShowPassConfirm(!showPassConfirm) }} className='absolute left-2'>
                                            {showPassConfirm ?
                                                <EyeIcon className='w-5 h-5 fill-primary' /> :
                                                <EyeOffIcon className='w-5 h-5 fill-primary' />
                                            }
                                        </div>
                                    </div>
                                    <ErrorMsg message={errors?.confirmPassword?.message as string} />
                                </div>
                                <div className='w-full'>
                                    <div className="w-full relative flex flex-col justify-center">
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            placeholder='كلمة المرور الجديدة'
                                            className={clsx(
                                                'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-2 lg:py-3 placeholder:text-right text-right',
                                                { "border-red-500": errors?.password?.message }
                                            )}
                                            {...register('password', {

                                            })}
                                        />
                                        <div onMouseDown={() => { setShowPass(!showPass) }} className='absolute left-2'>
                                            {showPass ?
                                                <EyeIcon className='w-5 h-5 fill-primary' /> :
                                                <EyeOffIcon className='w-5 h-5 fill-primary' />
                                            }
                                        </div>
                                    </div>
                                    <ErrorMsg message={errors?.password?.message as string} />
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={loading}
                                    className='disabled:bg-black/10 bg-primary text-white font-medium py-2 lg:py-3 rounded-md w-full flex justify-center items-center'
                                >
                                    {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : "حفظ"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeahcer