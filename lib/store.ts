import { create } from 'zustand'

export const useStore = create((set) => {
    return ({
        messages: [],
        chats: [],
        setMessage: (message: any) => set((state: any) => ({ messages: [...state.messages, message] })),
        setMessages: (messages: any) => set((state: any) => ({ messages: [...messages] })),
        setChats: (chatId: any) => set((state: any) => {
            const chat = state.chats.find((chat: any) => chat.id === chatId)
            return ({ chats: [chat, ...state.chats,] })
        }),
        setChat: (chat: any) => set((state: any) => {
            return [chat, ...state.chats]
        })
    })
})