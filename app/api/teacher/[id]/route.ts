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
function removeEmptyProperties(obj: any) {
    for (let key in obj) {
        if (obj[key] === '') {
            delete obj[key];
        }
    }
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        let body: bodyInterface = await req.json()
        const { id } = params
        if (body.email)
            body.email = body.email.replace(/\s/g, '').toLocaleLowerCase();
        if (body.password)
            body.email = await bcrypt.hash(body.password, 10)
        removeEmptyProperties(body)
        const user = await verifyAuth()
        if (user && (user.role == 'admin' || user.id == id))
            console.log({ id, user });
        await prisma.teacher.update({
            where: {
                id: id
            },
            data: {
                ...body
            },
        })
        return NextResponse.json({ message: 'تم التحديث بنجاح' }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}