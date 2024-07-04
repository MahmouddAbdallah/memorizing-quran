import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface bodyInterface {
    price: string
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {
        const body: bodyInterface = await req.json();
        const user = await verifyAuth()
        const { id } = params;

        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow, you are not admin' }, { status: 400 });
            if (!body.price) return NextResponse.json({ message: 'يجب ان تدخل سعر' }, { status: 400 });

            const token = await prisma.tokens.update({
                where: {
                    id
                },
                data: {
                    price: parseInt(body.price)
                }
            })
            return NextResponse.json({ token, message: 'تم التعديل' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params;
        const user = await verifyAuth()
        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow, you are not admin' }, { status: 400 });
            await prisma.tokens.delete(
                { where: { id } }
            )
            return NextResponse.json({ message: 'تم الحذف' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}