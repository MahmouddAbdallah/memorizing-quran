import React from 'react'
import { CloseIcon, LoadingIcon } from './icons'
import useClickOutside from '../hooks/useClickOutSide'
import clsx from 'clsx';

enum Action {
    ADD = 'اضف',
    EDIT = 'تعدل',
    DELETE = 'احذف',
    LOGOUT = 'تسجيل الخروج'
}
const PopUpMessage = ({
    handleAction,
    msg,
    setOpen,
    action,
    loading
}: {
    handleAction: any,
    msg: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    action: Action,
    loading: boolean;
}) => {
    const eleRef = useClickOutside(() => setOpen(false))
    return (
        <div className='fixed h-full w-full top-0 left-0 flex justify-center items-center bg-black/20 z-50'>
            <div ref={eleRef} className='w-full md:w-[550px] bg-white rounded-md overflow-hidden'>
                <div className='space-y-3'>
                    <div className='w-full flex justify-between py-3 border-b-2 px-2'>
                        <button
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon className='w-5 h-5' />
                        </button>
                        <h6>
                            {action}
                        </h6>
                    </div>
                    <div className='py-5 px-3'>
                        <p className='text-right'>{msg}</p>
                    </div>
                    <div className='flex justify-start px-3 py-2 gap-3 bg-gray-100'>
                        <button
                            disabled={loading}
                            className={clsx(
                                'px-3 py-2 rounded-md text-white disabled:bg-black/20 disabled:px-10',
                                { 'bg-red-500': action == Action.DELETE },
                                { 'bg-red-500': action == Action.LOGOUT },
                            )}
                            onClick={handleAction}
                        >
                            {loading ? <LoadingIcon className='w-6 h-6 animate-spin' /> : action}
                        </button>
                        <button
                            disabled={loading}
                            className='px-3 py-2 rounded-md bg-gray-300'
                            onClick={() => { setOpen(false) }}
                        >
                            الغاء
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpMessage