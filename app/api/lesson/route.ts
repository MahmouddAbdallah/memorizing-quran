import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';


export async function GET(req: Request) {
    try {
        const user = await verifyAuth()
        if (user) {
            if (user.role == 'admin' || user.role == 'teacher') return NextResponse.json({ message: 'Not allow' }, { status: 400 })
            const lessons = await prisma.lesson.findMany({
                orderBy: {
                    teacher: undefined
                }
            })
            return NextResponse.json({ lessons, message: 'Fetch successfully' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}