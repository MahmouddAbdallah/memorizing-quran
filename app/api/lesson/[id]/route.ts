import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';


interface bodyInterface {
    teacherId: string
}
export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {
        const body: bodyInterface = await req.json();
        const { id } = params;
        const user = await verifyAuth()
        if (user) {
            if (user.role == 'admin' || user.role == 'teacher') return NextResponse.json({ message: 'Not allow' }, { status: 400 })
            const lesson = await prisma.lesson.update({
                where: { id },
                data: {
                    teacherId: body.teacherId
                }
            })
            return NextResponse.json({ lesson, message: 'Fetch successfully' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}