import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';

export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth();
        if (!user) return;
        const count = await prisma.message.count({
            where: {
                isRead: false,
                receiver: {
                    is: {
                        id: user.id
                    }
                }
            },
        })
        return NextResponse.json({ count }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}