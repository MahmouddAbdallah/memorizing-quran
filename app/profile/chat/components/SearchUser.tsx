'use client';
import React, { useState } from 'react'

const SearchUser = () => {
    const [keyword, setKeyword] = useState('');
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);


    return (
        <div>
            <div>
                <input
                    type="text"
                    className='w-full border rounded-md outline-none px-2 py-3 text-right'
                    placeholder='...ابحث'
                />
            </div>
        </div>
    )
}

export default SearchUser