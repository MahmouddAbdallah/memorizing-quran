import prisma from '@/prisma/client'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from 'next/headers';

export const verifyAuth = async (token?: string) => {
    try {
        if (token) {
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
                        role: true
                    }
                })
                if (!teacher) return false
                return teacher
            } else {
                const user = await prisma.user.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        id: true,
                        role: true
                    }
                })
                if (!user) return false
                return user
            }
        } else {
            const token = await cookies().get('token')?.value;
            if (!token) return false;
            else {
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
                            role: true
                        }
                    })
                    if (!teacher) return false
                    return teacher
                } else {
                    const user = await prisma.user.findUnique({
                        where: {
                            id: id
                        },
                        select: {
                            id: true,
                            role: true
                        }
                    })
                    if (!user) return false
                    return user
                }
            }
        }
    } catch (error: any) {
        return false;
    }
}