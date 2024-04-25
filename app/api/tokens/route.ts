import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
import CODENUM from '@/app/utils/GenerateCode';

interface bodyInterface {
    code: string
    decode: string
    price: string
}

export async function POST(req: Request) {
    try {
        const body: bodyInterface = await req.json();
        const codeNumber = CODENUM(15)
        const user = await verifyAuth()
        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow, you are not admin' }, { status: 400 });
            if (!body.price) return NextResponse.json({ message: 'Please Enter price' }, { status: 400 });

            const token = await prisma.tokens.create({
                data: {
                    code: `${codeNumber}`,
                    price: parseInt(body.price)
                }
            })

            return NextResponse.json({ token, message: 'Create successfully' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}


export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const token = searchParams.get('token');

        const user = await verifyAuth(token as string)
        if (user) {
            if (user.role != 'admin') return NextResponse.json({ message: 'Not allow, you are not admin' }, { status: 400 });
            const codes = await prisma.tokens.findMany({})
            return NextResponse.json({ codes, message: 'fetch tokens successfully!!' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}