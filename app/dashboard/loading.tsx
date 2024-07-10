import React from 'react'
import { LoadingIcon } from '../components/icons'

const loading = () => {
    return (
        <div className='h-svh w-full flex justify-center items-center'>
            <LoadingIcon className='size-8 stroke-black animate-spin' />
        </div>
    )
}

export default loading