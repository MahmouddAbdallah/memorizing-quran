import { getRole } from '@/lib/verfiyAuth'
import { cookies } from 'next/headers'
import React from 'react'
import TodayTeacher from './components/TodayTeacher';
import Today from './components/Today';

const page = () => {
    const token = cookies().get('token')?.value;
    const user = getRole(token as string)
    if (user?.role != 'user') {
        return <TodayTeacher />
    }
    else {
        return <Today />
    }
}

export default page