import React from 'react'
import TokensTable from './TokensTable';
import { getCodes } from '@/app/utils/get-data/fetchCodes';

const Tokens = async () => {
    const data = await getCodes();

    return (
        <div className='pb-20 flex flex-col items-center'>
            <div className='text-center pt-20 pb-10'>
                <h6 className='text-xl font-medium'> الاكود المتاحه</h6>
            </div>
            <div className='relative overflow-x-auto bg-white py-10 lg:px-5 lg:rounded-md w-[calc(100vw-30px)] lg:w-[calc(100vw-330px)]'>
                <TokensTable data={data} />
            </div>
        </div>
    )
}

export default Tokens