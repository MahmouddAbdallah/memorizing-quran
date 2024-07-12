import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { getRole, verifyAuth } from '@/lib/verfiyAuth';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    try {
        const token = cookies().get('token')?.value;
        const user = getRole(token);
        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const keyword = query.get('keyword')
        if (!keyword) return NextResponse.json({ message: "لايوجد", }, { status: 400 });
        if (user?.role == 'admin') {
            const users = await prisma.user.findMany({
                where: {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } }
                    ]
                }
            })
            const teahcers = await prisma.teacher.findMany({
                where: {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } }
                    ]
                }
            })
            return NextResponse.json({ users, teahcers }, { status: 400 });
        }
        else if (user?.role == 'teacher') {
            const users = await prisma.user.findMany({
                where: {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } }
                    ],
                    Lesson: {
                        some: {
                            teacherId: user.id
                        }
                    }
                }
            })
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}
