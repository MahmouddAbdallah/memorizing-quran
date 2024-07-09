import Confirm from '@/app/components/Confirm';
import codenum from '@/app/utils/GenerateCode';
import sendMial from '@/app/utils/resend';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';


interface bodyInterface {
    name: string;
    email: string;
    date: string;
    phone: string;
    country: string;
    gender: string;
    password: string;
}
enum NotType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
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

        const code: number = codenum()
        const waitTowMinute = new Date(new Date().getTime() + 5 * 60000);
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (user) return NextResponse.json({ message: 'هذا المستخدم بالفعل هنا!! ' }, { status: 400 })
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: email,
                date: body.date,
                phone: body.phone,
                country: body.country,
                gender: body.gender,
                password: await bcrypt.hash(body.password, 10)
            },
        })

        await prisma.verification.create({
            data: {
                userId: newUser.id,
                code: `${code}`,
                updateAt: new Date(),
                wait: waitTowMinute
            }
        })
        await prisma.notification.create({
            data: {
                userId: newUser.id,
                message: "حساب جديد",
                type: NotType.CREATE,
                role: 'admin',
            }
        })

        const sendMial = new Resend(process.env.API_SECRET_RESEND_KEY);
        await sendMial.emails.send({
            from: process.env.EMAILADDRESS as string,
            to: newUser.email,
            subject: 'Confirm your email',
            text: `Your confirmation code is: ${code}`,
            react: Confirm({ message: `${code}` as string }),
        });

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET as string)
        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            maxAge: 5454512,
        })
        return NextResponse.json({ message: 'Create user successfully!!' }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}