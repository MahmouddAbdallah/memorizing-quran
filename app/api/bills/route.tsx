import { verifyAuth } from "@/lib/verfiyAuth"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/prisma/client';

export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth("", req)
        if (user) {
            const bills = await prisma.subscribePlan.findMany({
                where: {
                    userId: user.id
                },
                select: {
                    id: true,
                    subPlan: true,
                }
            })
            return NextResponse.json({ bills, message: 'fetch successfully' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}