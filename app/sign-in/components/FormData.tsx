'use client'
import { useForm } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, LoadingIcon, SignInIcon } from '../../components/icons'
import ErrorMsg from '@/app/components/ErrorMsg';
import { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FormData = () => {
    const { register, formState: { errors, isValid }, reset, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const onSubmit = handleSubmit(async (formData) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/sign-in', { ...formData })
            toast.success(data.message)
            reset();
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    })


    return (
        <form onSubmit={onSubmit}>
            <div>
                <div className='flex justify-center pt-5 pb-5'>
                    <div className='w-24 h-24 flex justify-center items-center bg-primary rounded-full'>
                        <SignInIcon className='w-10 h-10 fill-white stroke-[5px]' />
                    </div>
                </div>
                <div className='space-y-4'>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className="w-full">
                            <input
                                type="email"
                                {...register("email", { required: 'يرجي ادخال البريد الالكتروني' })}
                                placeholder='البريد الالكتروني'
                                className={clsx(
                                    'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                                    { "border-red-500": errors?.email?.message }
                                )}
                            />
                            <ErrorMsg message={errors?.email?.message as string} />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='w-full'>
                            <div className="w-full relative flex flex-col justify-center">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='كلمة المرور'
                                    className={clsx(
                                        'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                                        { "border-red-500": errors?.password?.message }
                                    )}
                                    {...register('password', {
                                        required: "الرجاء ادخال كلمة المرور."
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
                            disabled={!isValid || loading}
                            className='disabled:bg-black/10 bg-primary text-white font-medium py-3 rounded-md w-full flex justify-center items-center'
                        >
                            {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : "تسجيل الدخول"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormData