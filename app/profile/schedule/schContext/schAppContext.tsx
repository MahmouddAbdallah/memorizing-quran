
'use client'
import { useContext, createContext, useState, useCallback, useEffect, } from 'react'
import axios from 'axios'

type schType = {
    lessons: any;
    setLessons: React.Dispatch<React.SetStateAction<any>>
}
const SchContextProvider = createContext<undefined | schType>(undefined)


const SchProvider = ({ children }: { children: React.ReactNode }) => {
    const [lessons, setLessons] = useState([])
    const fetchLessons = useCallback(async () => {
        try {
            if (!lessons.length) {
                const { data } = await axios.get(`/api/lesson-weak`)
                setLessons(data.lessons)
            }
        } catch (error) {
            console.error(error);
        }
    }, [lessons.length])

    useEffect(() => {
        fetchLessons()
    }, [fetchLessons])
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