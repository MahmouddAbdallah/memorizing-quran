import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await verifyAuth()
        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (!regex.test(body.link)) return NextResponse.json({ message: 'Invaild link' })
        if (!body.userId) return NextResponse.json({ message: 'Please Enter user' })
        if (!body.lessonWeakId) return NextResponse.json({ message: 'Please Enter lessonWeak' })
        if (user) {
            if (user.role == 'admin' || user.role == 'teacher') {
                const session = await prisma.session.create({
                    data: {
                        link: body.link,
                        teacherId: user.id,
                        lessonWeakId: body.lessonWeakId,
                        userId: body.userId
                    }
                })
                return NextResponse.json({ session, message: 'Create successfully' }, { status: 201 })
            }
            else return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}