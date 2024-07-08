import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const user = await verifyAuth()
        const id = params.id;
        console.log(id);

        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (body.link) {
            if (!regex.test(body.link)) return NextResponse.json({ message: 'Invaild link' })
        }

        if (user) {
            if (user.role == 'admin' || user.role == 'teacher') {
                const session = await prisma.session.update({
                    where: {
                        id
                    },
                    data: {
                        ...body
                    }
                })
                return NextResponse.json({ session, message: 'Update successfully' }, { status: 201 })
            }
            else return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}