'use client'
import axios from 'axios'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
interface UserInterface {
    id: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string
}
type AppContextTypes = {
    user: UserInterface | null,
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>,
}
const appContext = createContext<AppContextTypes | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserInterface | null>(null)

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/verify-me')
            setUser(data?.user)
        } catch (error) {
            console.error(error);
            // toast.error('')
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser]);


    return (
        <appContext.Provider value={{ user, setUser }}>
            {children}
            <Toaster position='bottom-right' toastOptions={{ 'duration': 3000 }} />
        </appContext.Provider>
    )
}
export const useAppContext = () => {
    return (
        useContext(appContext)
    )
}
export default AppContextProvider