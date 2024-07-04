import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await verifyAuth()
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
export async function GET(req: Request) {
    try {
        const user = await verifyAuth()
        if (user) {
            const lessons = await prisma.lessonWeak.findMany({
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
                    lessonId: true
                }
            })
            return NextResponse.json({ lessons, message: 'fetch successfully' }, { status: 200 })
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