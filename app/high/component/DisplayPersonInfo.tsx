'use client'
import React, { memo } from 'react'
import HOC from './HOC'

const DisplayPersonInfo = ({ value }: { value: any }) => {
    return (
        <div>
            {value?.name}
            {value.age}
        </div>
    )
}

export default memo(HOC(DisplayPersonInfo))