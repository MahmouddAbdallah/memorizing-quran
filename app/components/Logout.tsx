import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

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
    return (
        <button
            onClick={logout}
        >
            تسجيل الخروج
        </button>
    )
}

export default Logout