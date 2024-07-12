import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await verifyAuth(req)
        console.log({ user });

        if (user) {
            if (user.role == 'admin' || user.role == 'teacher') {
                const lessonWeak = await prisma.lessonWeak.createMany(
                    {
                        data: body as any
                    }
                )
                return NextResponse.json({ lessonWeak, message: 'Create successfully' }, { status: 201 })
            }
            else return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}
export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth(req)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (user) {
            let lessons: any;
            if (user.role != 'user') {
                lessons = await prisma.lessonWeak.findMany({
                    where: {
                        lesson: {
                            teacher: {
                                id: user.id
                            }
                        },
                    },
                    select: {
                        id: true,
                        day: true,
                        timeSlot: true,
                        lessonId: true,
                        lesson: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        id: true
                                    }
                                }
                            }
                        },
                        session: {
                            where: {
                                cancelled: false,
                                createdAt: {
                                    gte: yesterday
                                }
                            },
                            select: {
                                id: true,
                                link: true
                            }
                        }
                    }
                })
                return NextResponse.json({ lessons, }, { status: 200 })
            }
            else {
                lessons = await prisma.lessonWeak.findMany({
                    where: {
                        lesson: {
                            user: {
                                id: user.id
                            }
                        },
                    },
                    select: {
                        id: true,
                        day: true,
                        timeSlot: true,
                        lessonId: true,
                        lesson: {
                            select: {
                                teacher: {
                                    select: {
                                        name: true,
                                        id: true
                                    }
                                }
                            }
                        },
                        session: {
                            where: {
                                cancelled: false,
                                createdAt: {
                                    gte: yesterday
                                }
                            },
                            select: {
                                id: true,
                                link: true
                            }
                        }
                    }
                })
                return NextResponse.json({ lessons, }, { status: 200 })
            }
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const user = await verifyAuth()
        if (user) {
            if (user.role == 'admin' || user.role == 'teacher') {
                const deletePromises = body.oldData.map((element: any) => {
                    return prisma.lessonWeak.delete({
                        where: { id: element.id }
                    });
                });
                const createManyPromise = prisma.lessonWeak.createMany({
                    data: body.data as any
                });
                const [_, lessonWeak] = await prisma.$transaction([
                    ...deletePromises,
                    createManyPromise
                ]);
                return NextResponse.json({ lessonWeak, message: 'update successfully' }, { status: 200 })
            }
            else return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        await prisma.$disconnect();
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}