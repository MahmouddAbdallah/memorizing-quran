'use client'
import { createContext, useContext, useEffect, useState, } from 'react'
import { Toaster } from 'react-hot-toast'
import { socket } from '../utils/socket'
import { useStore } from '@/lib/store'
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
    unReadNotification: any
}
const appContext = createContext<AppContextTypes | undefined>(undefined);

const AppContextProvider = ({ children, user, unReadNotification }: { children: React.ReactNode, user: UserInterface, unReadNotification: any }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const setUnReadMessageCount = useStore((state: any) => state.setUnReadMessageCount)

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.emit('add-user', user?.id)

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [user]);
    useEffect(() => {
        const handleMessage = (data: any) => {
            setUnReadMessageCount(data.chatId)
        }
        socket.on('notfiy', handleMessage)
        return () => {
            socket.off('notfiy', handleMessage)
        }
    }, [setUnReadMessageCount])
    return (
        <appContext.Provider value={{ user, unReadNotification }}>
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