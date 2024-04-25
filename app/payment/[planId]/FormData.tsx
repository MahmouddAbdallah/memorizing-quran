"use client";
import ErrorMsg from "@/app/components/ErrorMsg";
import { LoadingIcon } from "@/app/components/icons";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function FormData({ planId }: { planId: string }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false)
    const buyLesson = handleSubmit(async (formData) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`/api/subscribe-plan`, {
                planId: planId,
                code: formData.code
            })
            toast.success(data?.message);
            reset()
            setLoading(false)
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            reset()
            setLoading(false);
        }
    })

    return (
        <form
            className='space-y-5'
            onSubmit={buyLesson}
        >
            <input
                type='text'
                placeholder='الكود'
                className={clsx(
                    'w-full h-fit border-2 focus:border-primary hover:border-black/20 outline-none rounded-md px-2 py-3 placeholder:text-right text-right',
                    { "border-red-500": errors?.code?.message }
                )}
                {...register('code', { required: 'يرجي ادخال الكود' })}
            />
            <ErrorMsg message={errors?.code?.message as string} />
            <button
                disabled={loading}
                className='disabled:bg-black/10 bg-primary text-white font-medium py-3 rounded-md w-full flex justify-center items-center'
                type="submit"
            >
                {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : "اشتراك"}
            </button>
        </form>
    )
}
