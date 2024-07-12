'use client'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { ErrorIcon } from 'react-hot-toast'

const ToastServerError = ({ error, duration }: { error: any, duration?: number }) => {
    const msg = JSON.parse(error)
    const [hidden, setHidden] = useState(false);
    const handleHidden = () => {
        setHidden(true)
    }
    useEffect(() => {
        const timeout = setTimeout(handleHidden, duration || 3000);
        return () => {
            clearTimeout(timeout)
        }
    }, [duration])
    return (
        <div className={clsx(
            'fixed right-4 bottom-4',
            { 'hidden': hidden }
        )}>
            <div className='flex gap-3 shadow-md p-2 rounded-md border items-center'>
                <ErrorIcon />{msg.message}
            </div>
        </div>
    )
}

export default ToastServerError