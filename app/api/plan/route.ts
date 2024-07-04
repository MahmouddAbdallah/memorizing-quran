import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
interface bodyInterface {
    price: string
    duration: string
    student: string
    children: string
    session: string
}

export async function POST(req: NextRequest) {
    try {
        const body: bodyInterface = await req.json();
        const user = await verifyAuth()
        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow' }, { status: 400 })
            const plan = await prisma.plan.create({
                data: {
                    duration: body.duration,
                    price: parseInt(body.price),
                    children: body.children,
                    session: body.session,
                    student: body.student
                }
            })
            return NextResponse.json({ plan, message: 'Create successfully' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const plans = await prisma.plan.findMany({})
        return NextResponse.json({ plans, message: 'fetch plans successfully' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}