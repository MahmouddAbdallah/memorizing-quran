'use client'
import { createContext, useContext, } from 'react'
import { Toaster } from 'react-hot-toast'
interface UserInterface {
    id: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string,
    gender: string,
    country: string,
    active: boolean,
    date: string
}
type AppContextTypes = {
    user: UserInterface | null,
}
const appContext = createContext<AppContextTypes | undefined>(undefined);

const AppContextProvider = ({ children, user }: { children: React.ReactNode, user: UserInterface }) => {
    return (
        <appContext.Provider value={{ user }}>
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