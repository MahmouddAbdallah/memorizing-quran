import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/verfiyAuth';

interface bodyInterface {
    userId: string;
    teacherId: string;
    planId: string;
    code: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: bodyInterface = await req.json()
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const token = searchParams.get('token');
        const user = await verifyAuth(token as string)

        if (user) {
            const isBuy = await prisma.subscribePlan.findFirst({ where: { userId: user.id, planId: body.planId } })
            if (isBuy) return NextResponse.json({ message: "لقد اشتركة في هذه الدوره من قبل" }, { status: 400 })

            const code = await prisma.tokens.findFirst({ where: { code: body.code } });
            const plan = await prisma.plan.findFirst({ where: { id: body.planId } })
            if (!code) return NextResponse.json({ message: 'Invalid Code!!' }, { status: 400 })
            if (!plan) return NextResponse.json({ message: 'Invalid Plan!!' }, { status: 400 })
            // if (code?.expired == true) return NextResponse.json({ message: 'Invaild code!!' }, { status: 400 })

            if (code?.price == plan?.price) {
                const [bill] = await prisma.$transaction([
                    prisma.subscribePlan.create({
                        data: {
                            userId: user.id,
                            planId: body.planId,
                            subPlan: {
                                price: plan.price,
                                student: plan.student,
                                children: plan.children,
                                session: plan.session,
                                duration: plan.duration
                            }
                        }
                    }),
                    prisma.tokens.delete({
                        where: {
                            id: code.id
                        },
                    }),
                    prisma.lesson.create({
                        data: {
                            userId: user.id,
                            duration: plan.duration,
                            session: plan.session
                        }
                    })
                ])
                return NextResponse.json({ bill, message: 'Create successfully' }, { status: 201 })
            }
            else if (code.price > plan.price) {
                let balance: any
                balance = await prisma.balance.findFirst({ where: { userId: user.id } })
                if (!balance) balance = await prisma.balance.create({ data: { userId: user.id } })
                const [bill] = await prisma.$transaction([
                    prisma.subscribePlan.create({
                        data: {
                            userId: user.id,
                            planId: body.planId,
                            subPlan: {
                                price: plan.price,
                                student: plan.student,
                                children: plan.children,
                                session: plan.session,
                                duration: plan.duration
                            }
                        }
                    }),
                    prisma.tokens.delete({
                        where: {
                            id: code.id
                        },
                    }),
                    prisma.balance.update({
                        where: {
                            id: balance.id
                        },
                        data: {
                            price: (code.price - plan.price) + balance.price
                        },
                    }),
                    prisma.lesson.create({
                        data: {
                            userId: user.id,
                            duration: plan.duration,
                            session: plan.session
                        }
                    }),
                ])
                await prisma.notification.create({
                    data: {
                        userId: user.id,
                        type: 'CREATE',
                        message: "لقد اشتركة في الدوره",
                        subscribeId: bill.id
                    }
                })
                return NextResponse.json({ bill, message: 'Create successfully' }, { status: 201 })
            } else {
                return NextResponse.json({ message: 'مالك لا يكفي' }, { status: 400 })
            }
        } else {
            return NextResponse.json({ message: 'Not allow' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}
// return NextResponse.json({ message: 'Create successfully' }, { status: 201 })