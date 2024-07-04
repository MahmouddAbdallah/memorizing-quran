import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

interface bodyInterface {
    name: string;
    email: string;
    date: string;
    phone: string;
    country: string;
    gender: string;
    password: string;
    role: any
}
export async function POST(req: NextRequest) {
    try {
        const body: bodyInterface = await req.json()
        const email = body.email.replace(/\s/g, '').toLocaleLowerCase();
        if (!body.name) return NextResponse.json({ message: 'Please enter you name' }, { status: 400 })
        if (!email) return NextResponse.json({ message: 'Please enter you email' }, { status: 400 })
        if (!body.date) return NextResponse.json({ message: 'Please enter you date' }, { status: 400 })
        if (!body.gender) return NextResponse.json({ message: 'Please enter you gender' }, { status: 400 })
        if (!body.password) return NextResponse.json({ message: 'Please enter you password' }, { status: 400 })
        if (!body.country) return NextResponse.json({ message: 'Please enter you country' }, { status: 400 })
        if (!body.phone) return NextResponse.json({ message: 'Please enter you phone' }, { status: 400 })

        const teacher = await prisma.teacher.findFirst({
            where: {
                email
            }
        })
        if (teacher) return NextResponse.json({ message: 'هذا المدرس بالفعل هنا!! ' }, { status: 400 })
        const newteacher = await prisma.teacher.create({
            data: {
                name: body.name,
                email: email,
                date: body.date,
                phone: body.phone,
                country: body.country,
                gender: body.gender,
                role: body.role,
                password: await bcrypt.hash(body.password, 10)
            },
        })

        const token = jwt.sign({ id: newteacher.id, role: newteacher.role }, process.env.JWT_SECRET as string)
        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            maxAge: 5454512,
        })
        return NextResponse.json({ message: 'لقد انشأت حساب بنجاح' }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const admin = await verifyAuth();
        if (!admin)
            return NextResponse.json({ message: 'Not Allow', }, { status: 400 });
        if (admin.role != 'admin')
            return NextResponse.json({ message: 'Not Allow', }, { status: 400 });

        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const keyword = query.get('keyword');
        if (keyword) {
            const teachers = await prisma.teacher.findMany({
                where: {
                    OR: [
                        { name: { contains: keyword as string, mode: 'insensitive' } },
                    ]
                }, select: {
                    id: true,
                    name: true,
                }
            })
            return NextResponse.json({ teachers, }, { status: 200 })
        }
        return NextResponse.json({ message: 'There is no keword hhh!!', }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}