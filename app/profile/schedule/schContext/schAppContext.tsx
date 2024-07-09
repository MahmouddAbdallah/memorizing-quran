'use client'
import { useContext, createContext, useState, useCallback, useEffect, } from 'react'
import axios from 'axios'

type schType = {
    lessons: any;
    setLessons: React.Dispatch<React.SetStateAction<any>>
}
const SchContextProvider = createContext<undefined | schType>(undefined)


const SchProvider = ({ children, data }: { children: React.ReactNode, data: any }) => {
    const [lessons, setLessons] = useState([])
    useEffect(() => {
        setLessons(data.lessons)
    }, [data])
    return (
        <SchContextProvider.Provider value={{ lessons, setLessons }}>
            {children}
        </SchContextProvider.Provider >
    )
}

export const useSchAppContext = () => {
    return useContext(SchContextProvider)
}

export default SchProvider