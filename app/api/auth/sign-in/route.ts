import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'


interface bodyInterface {
    email: string;
    password: string;
}
export async function POST(req: Request) {
    try {
        const body: bodyInterface = await req.json();
        const email = body.email.replace(/\s/g, '').toLocaleLowerCase();
        if (!email) return NextResponse.json({ message: 'Please enter you email' }, { status: 400 })
        if (!body.password) return NextResponse.json({ message: 'Please enter you password' }, { status: 400 })
        let user;
        user = await prisma.teacher.findFirst({
            where: {
                email: email as string
            }
        })
        if (user) {
            const isMatch = await bcrypt.compare(body.password, user.password as string);
            if (!isMatch) return NextResponse.json({ message: 'كلمة المرور خاطئه' }, { status: 400 })
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string)
            cookies().set({
                name: 'token',
                value: token,
                httpOnly: true,
                maxAge: 5454512,
            })
            return NextResponse.json({ message: 'Sign in successfully!!' }, { status: 200 })
        } else {
            user = await prisma.user.findFirst({
                where: {
                    email: email as string
                }
            })
            if (!user) return NextResponse.json({ message: 'الرجاء قم بنشاء حساب لان هذا الحساب غير موجود' }, { status: 400 })
            const isMatch = await bcrypt.compare(body.password, user.password as string);
            if (!isMatch) return NextResponse.json({ message: 'كلمة المرور خاطئه' }, { status: 400 })
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string)
            cookies().set({
                name: 'token',
                value: token,
                httpOnly: true,
                maxAge: 5454512,
            })
            return NextResponse.json({ message: 'Sign in successfully!!' }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}