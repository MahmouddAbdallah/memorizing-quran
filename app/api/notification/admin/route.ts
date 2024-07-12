import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';


export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth(req)
        if (user) {
            if (user.role == 'admin') {
                const notification = await prisma.adminNotification.findMany({
                    select: {
                        user: {
                            select: {
                                name: true,
                                id: true,
                            }
                        },
                        message: true,
                        id: true,
                        createdAt: true,
                        type: true,
                        isRead: true,
                        teacher: {
                            select: {
                                name: true,
                                id: true
                            }
                        }
                    }
                })
                return NextResponse.json({ notification }, { status: 200 })
            }
            else return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}
export async function PUT(req: NextRequest) {
    try {
        await prisma.adminNotification.updateMany({
            where: {
                isRead: false
            },
            data: {
                isRead: true
            }
        })
        return NextResponse.json({ message: 'Successfully updated!!' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}