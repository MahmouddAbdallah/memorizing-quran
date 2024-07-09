import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import PopUpMessage from './PopUpMessage';
enum Action {
    ADD = 'اضف',
    EDIT = 'تعدل',
    DELETE = 'احذف',
    LOGOUT = 'تسجيل الخروج'
}
const Logout = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const logout = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/logout')
            localStorage.clear()
            toast.success(data.message);
            router.push('/')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'There is an error');
            setLoading(false);
        }
    }
    const [open, setOpen] = useState(false)
    return (
        <div className='w-full'>
            <button
                onClick={() => setOpen(true)}
            >
                تسجيل الخروج
            </button>
            {open && <PopUpMessage
                setOpen={setOpen}
                loading={loading}
                handleAction={logout}
                action={Action.LOGOUT}
                msg='هل تريد تسجيل الخروج'
            />}
        </div>
    )
}

export default Logout