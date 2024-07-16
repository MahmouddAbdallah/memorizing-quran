import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const userId = query.get('userId') as string;
        const userRole = query.get('userRole') as string;
        const chatId = query.get('chatId') as string;
        if (!body.message)
            return NextResponse.json({ message: 'Please Enter the message.' }, { status: 400 })
        if (!userId)
            return NextResponse.json({ message: 'Please Enter the user id' }, { status: 400 })
        if (!userRole)
            return NextResponse.json({ message: 'Please Enter the user role' }, { status: 400 })
        const user = await verifyAuth(req);
        if (!user)
            return NextResponse.json({ message: 'Not Allow' }, { status: 400 })

        if (chatId) {
            const [msg, _] = await prisma.$transaction([
                prisma.message.create({
                    data: {
                        message: body.message,
                        receiver: {
                            id: userId,
                            role: userRole,
                        },
                        sender: {
                            id: user.id,
                            role: user.role == 'admin' ? 'teacher' : user.role,
                        },
                        chatId: chatId,
                    },
                    select: {
                        id: true,
                        message: true,
                        sender: true,
                        receiver: true,
                        createdAt: true,
                        chatId: true
                    }
                }),
                prisma.chat.update({
                    where: {
                        id: chatId
                    },
                    data: {
                        updatedAt: new Date()
                    }
                })
            ])
            return NextResponse.json({ message: msg, }, { status: 201 })
        }
        else {
            const chat = await prisma.chat.findFirst({
                where: {
                    OR: [
                        {
                            sender: {
                                id: userId,
                                role: userRole
                            },
                            receiver: {
                                id: user.id,
                                role: user.role == 'admin' ? 'teacher' : user.role
                            }
                        },
                        {
                            sender: {
                                id: user.id,
                                role: user.role == 'admin' ? 'teacher' : user.role
                            },
                            receiver: {
                                id: userId,
                                role: userRole
                            }
                        }
                    ]
                }
            })
            if (chat) {
                const [msg, _] = await prisma.$transaction([
                    prisma.message.create({
                        data: {
                            message: body.message,
                            receiver: {
                                id: userId,
                                role: userRole,
                            },
                            sender: {
                                id: user.id,
                                role: user.role == 'admin' ? 'teacher' : user.role,
                            },
                            chatId: chat.id,
                        }, select: {
                            id: true,
                            message: true,
                            sender: true,
                            receiver: true,
                            createdAt: true,
                        }
                    }),
                    prisma.chat.update({
                        where: {
                            id: chat.id
                        },
                        data: {
                            updatedAt: new Date()
                        }
                    })
                ])
                return NextResponse.json({ message: msg, }, { status: 201 })
            } else {
                const newChat = await prisma.chat.create({
                    data: {
                        receiver: {
                            id: userId,
                            role: userRole,
                        },
                        sender: {
                            id: user.id,
                            role: user.role == 'admin' ? 'teacher' : user.role,
                        },
                    }
                })
                const msg = await prisma.message.create({
                    data: {
                        message: body.message,
                        receiver: {
                            id: userId,
                            role: userRole,
                        },
                        sender: {
                            id: user.id,
                            role: user.role == 'admin' ? 'teacher' : user.role,
                        },
                        chatId: newChat.id,
                    },
                    select: {
                        id: true,
                        message: true,
                        sender: true,
                        receiver: true,
                        createdAt: true,
                        chatId: true
                    }
                })
                let receiver;
                if (newChat.receiver.role == 'teacher' || newChat.receiver.role == 'admin') {
                    receiver = await prisma.teacher.findUnique({
                        where: {
                            id: newChat.receiver.id
                        }
                    })
                } else {
                    receiver = await prisma.user.findUnique({
                        where: {
                            id: newChat.receiver.id
                        }
                    })
                }
                return NextResponse.json({
                    message: msg,
                    chat: {
                        sender: {
                            id: user.name,
                            name: true,
                            role: true
                        },
                        receiver: {
                            id: receiver?.id,
                            name: receiver?.name,
                            role: receiver?.role
                        },
                        id: newChat.id,
                        updatedAt: newChat.updatedAt
                    }
                }, { status: 201 })
            }
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const chatId = query.get('chatId') as string;
        if (!chatId)
            return NextResponse.json({ message: 'Please Enter the chat Id.' }, { status: 400 })
        const user = await verifyAuth(req);
        if (!user)
            return NextResponse.json({ message: 'Not Allow' }, { status: 400 })
        const messages = await prisma.message.findMany({
            where: {
                chatId
            },
            select: {
                id: true,
                message: true,
                sender: true,
                receiver: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "asc"
            },
            take: 15,
        })
        let msgs = messages.map((msg) => {
            return {
                id: msg.id,
                message: msg.message,
                sender: { id: msg.sender.id },
                receiver: { id: msg.receiver.id },
                createdAt: msg.createdAt,
            }
        })
        msgs = await Promise.all(msgs);
        return NextResponse.json({ messages: msgs }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}
export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const chatId = query.get('chatId') as string;
        const user = await verifyAuth();
        if (!user) return;
        await prisma.message.updateMany({
            where: {
                chatId: chatId,
                isRead: false,
                receiver: {
                    is: {
                        id: user.id
                    }
                }
            },
            data: {
                isRead: true
            }
        })
        return NextResponse.json({ message: 'successfully updated!!' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}