import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';


export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        if (!user)
            return NextResponse.json({ message: 'Not Allow' }, { status: 400 })

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    {
                        sender: {
                            id: user.id,
                            role: user.role == 'admin' ? 'teacher' : user.role
                        }
                    },
                    {
                        receiver: {
                            id: user.id,
                            role: user.role == 'admin' ? 'teacher' : user.role
                        }
                    }
                ]
            }
        })
        const ch = chats.map(async (chat) => {

            if (chat.receiver.id == user.id && (chat.receiver.role == 'teacher' || chat.receiver.role == 'admin')) {
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
                    updatedAt: chat.updatedAt
                }
            }
            else if (chat.receiver.id == user.id && (chat.receiver.role == 'user')) {
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
                    updatedAt: chat.updatedAt
                }
            }
            else {
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
                    updatedAt: chat.updatedAt
                }
            }
        })
        const newC = await Promise.all(ch)
        return NextResponse.json({ chats: newC }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}