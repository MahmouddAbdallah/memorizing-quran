import prisma from '@/prisma/client'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    try {
        const tokenBearar = req.headers.get('authorization') as string;
        let token = ""
        if (tokenBearar) {
            token = tokenBearar?.split(" ")[1]
        } else {
            token = cookies().get('token')?.value as string;
        }
        const decode = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const id = (decode as JwtPayload).id
        const role = (decode as JwtPayload).role
        if (role == 'admin' || role == 'teacher') {
            const teacher = await prisma.teacher.findUnique({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    role: true,
                    name: true,
                    country: true,
                    date: true,
                    email: true,
                    gender: true,
                    phone: true,
                    active: true,
                }
            })
            if (!teacher) NextResponse.json({ message: 'Please Sign up' }, { status: 400 })
            return NextResponse.json({ message: 'Successfully get user', user: teacher }, { status: 200 })

        } else {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    role: true,
                    name: true,
                    country: true,
                    date: true,
                    email: true,
                    gender: true,
                    phone: true,
                    active: true,
                }
            })
            if (!user) NextResponse.json({ message: 'Please Sign up' }, { status: 400 })
            return NextResponse.json({ message: 'Successfully get user', user }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}