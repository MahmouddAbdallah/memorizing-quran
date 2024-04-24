import React from 'react'
import FormData from './FormData'

const Token = () => {
    return (
        <div className='h-svh flex flex-col lg:justify-center items-center'>
            <div className='text-center py-10'>
                <h6 className='text-xl font-medium'>انشاء كود</h6>
            </div>
            <FormData />
        </div>
    )
}

export default Token