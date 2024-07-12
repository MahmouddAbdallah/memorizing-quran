import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';
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
        if (!body.gender) return NextResponse.json({ message: 'Please enter you gender' }, { status: 400 })
        if (!body.password) return NextResponse.json({ message: 'Please enter you password' }, { status: 400 })

        const teacher = await prisma.teacher.findFirst({
            where: {
                email
            }
        })

        if (teacher) return NextResponse.json({ message: 'هذا المدرس بالفعل هنا!! ' }, { status: 400 })
        await prisma.teacher.create({
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

        return NextResponse.json({ message: 'لقد انشأت حساب بنجاح' }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}


export async function GET(req: NextRequest) {
    try {
        const admin = await verifyAuth(req);
        if (!admin)
            return NextResponse.json({ message: 'Not Allow', }, { status: 400 });
        if (admin.role != 'admin')
            return NextResponse.json({ message: 'Not Allow', }, { status: 400 });

        const url = new URL(req.url);
        const query = new URLSearchParams(url.search);
        const keyword = query.get('keyword');
        let teachers: any;
        teachers = await prisma.teacher.findMany({})
        if (keyword) {
            teachers = await prisma.teacher.findMany({
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
        else return NextResponse.json({ teachers, }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}