'use client'
import React, { useState } from 'react'
import ErrorMsg from '@/app/components/ErrorMsg'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { CopyIcon, LoadingIcon } from '@/app/components/icons'
import { toast } from 'react-hot-toast'
import axios from 'axios';

const FormData = () => {
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm()
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState<any>(null)
    const onSubmit = handleSubmit(async (formData) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/tokens', { ...formData }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setCode(data.token)
            toast.success(data?.message);
            reset()
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    })
    const copy = (code: string) => {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        // Remove the temporary textarea
        document.body.removeChild(textarea);
        toast.success("Copied!");
        return "Text copied to clipboard";
    }
    return (
        <div className='w-full px-5'>
            <div className='w-full lg:w-[500px] px-10 pt-5 pb-10 border rounded-lg bg-white space-y-10'>
                <form onSubmit={onSubmit} className='w-full flex justify-center'>
                    <div className='w-full space-y-5'>
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
                            {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : "انشاء"}
                        </button>
                    </div>
                </form>
                {
                    code &&
                    <div className='w-full space-y-3 text-sm'>
                        <div className='flex items-center justify-between'>
                            <p className='font-medium'>{code?.price}</p>
                            <h6>لقد انشات كود بقيمة </h6>
                        </div>
                        <div className='bg-gray-100 py-2 w-full px-3 rounded-md'>
                            <div className='flex items-center justify-between'>
                                <button onClick={() => {
                                    copy(code?.code)
                                }}><CopyIcon className='' /></button>
                                <p className=""><span className='font-medium'>{code?.code}</span> : الكود</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default FormData
