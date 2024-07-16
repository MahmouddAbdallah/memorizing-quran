import { create } from 'zustand'

export const useStore = create((set) => {
    return ({
        messages: [],
        chats: [],
        unRead: 0,
        setMessage: (message: any) => set((state: any) => {
            const chat = state.chats.find((ele: any) => ele.id == message.chatId)
            chat.updatedAt = Date.now();
            const chats = state.chats.filter((item: any) => item.id != message.chatId)
            return ({ messages: [...state.messages, message], chats: [chat, ...chats] })
        }),
        setMessages: (messages: any) => set(() => ({ messages: [...messages] })),
        setChats: (chats: any) => set((state: any) => {
            return ({ chats: [...chats] })
        }),
        setChat: (chat: any) => set((state: any) => {
            return [chat, ...state.chats]
        }),
        setUnReadMessage: (chatId: any) => set((state: any) => {
            const counts = state.chats.find((ele: any) => ele.id == chatId).unReadMessage;
            state.unRead -= counts
            state.chats.find((ele: any) => ele.id == chatId).unReadMessage = 0
            return { ...state }
        }),
        setUnReadMessageCount: (chatId: any) => set((state: any) => {
            let chats = [];
            const chat = state.chats.find((ele: any) => ele?.id == chatId)
            if (chat) {
                chat.unReadMessage += 1;
                chat.updatedAt = Date.now();
                chats = state.chats.filter((item: any) => item.id != chatId)
            }
            state.unRead += 1
            return ({ ...state, chats: [chat, ...chats], })
        }),
        setUnread: (number: any) => set((() => {
            return ({ unRead: number })
        }))
    })
})