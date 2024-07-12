'use client'
import { useContext, createContext, useState, useCallback, useEffect, } from 'react'
import axios from 'axios'

type schType = {
    lessons: any;
    setLessons: React.Dispatch<React.SetStateAction<any>>,
    isLesson: boolean
}
const SchContextProvider = createContext<undefined | schType>(undefined)


const SchProvider = ({ children, data }: { children: React.ReactNode, data: any }) => {
    const [lessons, setLessons] = useState([])
    const [isLesson, setIsLesson] = useState(false)
    useEffect(() => {
        if (data?.lessons) {
            setLessons(data.lessons)
        }
        setIsLesson(data?.isLesson)
    }, [data])

    return (
        <SchContextProvider.Provider value={{ lessons, setLessons, isLesson }}>
            {children}
        </SchContextProvider.Provider >
    )
}

export const useSchAppContext = () => {
    return useContext(SchContextProvider)
}

export default SchProvider