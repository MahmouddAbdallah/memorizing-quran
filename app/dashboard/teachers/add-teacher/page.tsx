import React from 'react'
import FormData from './components/FormData'

const page = () => {
    return (
        <div className=' pb-20'>

            <div className='flex justify-center p-container pt-20'>
                <div className='bg-[#fefefe] px-5 pt-5 pb-10 rounded-xl w-full sm:w-10/12 lg:w-[63%] shadow-md'>
                    <FormData />
                </div>
            </div>
        </div>
    )
}

export default page