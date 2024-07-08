import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';


export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth(req)
        if (user) {
            if (user.role == 'admin') {
                const lessons = await prisma.lesson.findMany({
                    select: {
                        id: true,
                        user: {
                            select: {
                                name: true,
                                email: true,
                            }
                        },
                        teacher: {
                            select: {
                                name: true,
                                email: true,
                            }
                        },
                        LessonWeak: {
                            select: {
                                id: true,
                                timeSlot: true,
                                day: true
                            }
                        },
                        session: true,
                        duration: true
                    }
                })
                return NextResponse.json({ lessons, message: 'Fetch successfully' }, { status: 200 })
            }
            else return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}