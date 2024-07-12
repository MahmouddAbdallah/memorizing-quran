import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';


export async function GET(req: NextRequest) {
    try {
        const userVerify = await verifyAuth(req);
        if (!userVerify)
            return NextResponse.json({ message: 'Not Allow' }, { status: 400 })

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    {
                        sender: {
                            id: userVerify.id,
                            role: userVerify.role == 'admin' ? 'teacher' : userVerify.role
                        }
                    },
                    {
                        receiver: {
                            id: userVerify.id,
                            role: userVerify.role == 'admin' ? 'teacher' : userVerify.role
                        }
                    }
                ]
            }, orderBy: {
                updatedAt: 'desc'
            },
        })
        const ch = chats.map(async (chat) => {
            if (chat.receiver.id == userVerify.id && (chat.receiver.role == 'teacher' || chat.receiver.role == 'admin')) {
                const user = await prisma.teacher.findUnique({
                    where: { id: chat.sender.id },
                    select: {
                        id: true,
                        name: true,
                        role: true
                    }
                })
                const unReadMessage = await prisma.message.count({
                    where: {
                        chatId: chat.id,
                        isRead: false,
                        receiver: {
                            is: {
                                id: userVerify.id
                            }
                        }
                    }
                })
                return {
                    user,
                    id: chat.id,
                    updatedAt: chat.updatedAt,
                    unReadMessage
                }
            }
            else if (chat.receiver.id == userVerify.id && (chat.receiver.role == 'user')) {
                const unReadMessage = await prisma.message.count({
                    where: {
                        chatId: chat.id,
                        isRead: false,
                        receiver: {
                            is: {
                                id: userVerify.id
                            }
                        }
                    }
                })
                const user = await prisma.teacher.findUnique({
                    where: { id: chat.sender.id },
                    select: {
                        id: true,
                        name: true,
                        role: true
                    }
                })
                return {
                    user,
                    id: chat.id,
                    updatedAt: chat.updatedAt,
                    unReadMessage
                }
            }
            else {
                const unReadMessage = await prisma.message.count({
                    where: {
                        chatId: chat.id,
                        isRead: false,
                        receiver: {
                            is: {
                                id: userVerify.id
                            }
                        }
                    }
                })
                const user = await prisma.user.findUnique({
                    where: { id: chat.receiver.id },
                    select: {
                        id: true,
                        name: true,
                        role: true
                    }
                })
                return {
                    user,
                    id: chat.id,
                    updatedAt: chat.updatedAt,
                    unReadMessage
                }
            }
        })
        const newC = await Promise.all(ch)
        return NextResponse.json({ chats: newC }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}