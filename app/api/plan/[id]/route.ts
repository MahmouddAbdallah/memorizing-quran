import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';


interface bodyInterface {
    price: number
    duration: string
    student: string
    children: string
    session: string
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {
        const body: bodyInterface = await req.json();
        const user = await verifyAuth();
        const { id } = params;

        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow' }, { status: 400 })
            const plan = await prisma.plan.update({
                where: {
                    id
                },
                data: {
                    duration: body.duration,
                    price: body.price,
                    children: body.children,
                    session: body.session,
                    student: body.student
                }
            })
            return NextResponse.json({ plan, message: 'Update successfully' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}


export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params;
        const user = await verifyAuth(req);
        if (user) {
            const plan = await prisma.plan.findFirst({
                where: { id: id }
            })
            return NextResponse.json({ plan, message: 'Fetch data successfully' }, { status: 200 })
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
        const user = await verifyAuth();
        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow' }, { status: 400 })
            const plan = await prisma.plan.delete({
                where: { id: id }
            })
            return NextResponse.json({ plan, message: 'Delete plans successfully' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}
