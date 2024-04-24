import React from 'react'
import FormData from './components/FormData'

const page = () => {
    return (
        <div className=' pb-20'>
            <div className='bg-primary pt-16 pb-40 text-center'>
                <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-white'>مرحبا بك مجددا ، لنسجل الدخول</h3>
            </div>
            <div className='flex justify-center p-container'>
                <div className='bg-[#fefefe] px-5 pt-5 pb-10 rounded-xl w-full sm:w-10/12 lg:w-[50%] -mt-28 shadow-md'>
                    <FormData />
                </div>
            </div>
        </div>
    )
}

export default page