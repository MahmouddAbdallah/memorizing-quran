import Confirm from '@/app/components/Confirm';
import CODENUM from '@/app/utils/GenerateCode';
import sendMial from '@/app/utils/resend';
import prisma from '@/prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params
        const { code } = await req.json();
        const verification = await prisma.verification.findFirst({
            where: { userId: id }
        })
        if (!verification) {
            return NextResponse.json({ message: 'There is no verification for this user!!' }, { status: 400 })
        }
        if (!(code == verification.code)) {
            return NextResponse.json({ message: "This code is not correct" }, { status: 400 })
        } else {
            //active the user
            const [user, _] = await prisma.$transaction([
                prisma.user.update({
                    where: { id: id },
                    data: {
                        active: true
                    },
                    select: {
                        name: true,
                        email: true,
                        active: true,
                    }
                }),
                //delete verification
                prisma.verification.delete({
                    where:
                    {
                        id: verification.id
                    }
                })
            ])
            return NextResponse.json({ message: 'Successfully active user!!', user }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}



export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params
        const code = CODENUM();
        const waitTowMinute = new Date(new Date().getTime() + 5 * 60000);
        const now = new Date().getMinutes()

        const verification = await prisma.verification.findFirst({
            where: { userId: id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                }
            }
        })
        if (!verification) {
            return NextResponse.json({ message: 'There is no verification for this user!!' }, { status: 400 })
        }
        // const wait = verification.wait.getMinutes()
        // if (now < wait) {
        //     return NextResponse.json({ message: `Still ${wait - now} minute` }, { status: 400 })
        // }
        // else if (now >= wait) {
        await prisma.verification.update({
            where: { id: verification.id },
            data: {
                userId: verification.userId,
                code: `${code}`,
                updateAt: new Date(),
                wait: waitTowMinute
            }
        })
        const { data, error } = await sendMial.emails.send({
            from: process.env.EMAILADDRESS as string,
            to: verification.user.email,
            subject: 'Confirm your email',
            text: `Your confirmation code is: ${code}`,
            react: Confirm({ message: `${code}` as string }),
        });
        return NextResponse.json({ message: 'successfully resend code on email', verification, data, error }, { status: 200 })
        // }
    } catch (error: any) {
        return NextResponse.json({ message: 'Error in server', error: error.message }, { status: 400 })
    }
}