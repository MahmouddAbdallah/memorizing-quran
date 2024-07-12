import prisma from '@/prisma/client'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const verifyAuth = async (req?: NextRequest) => {
    try {
        let token = ""
        if (req) {
            const tokenBearar = req.headers.get('authorization') as string;
            if (tokenBearar) {
                token = tokenBearar?.split(" ")[1]
            } else {
                token = cookies().get('token')?.value as string;
            }
        }
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
                        role: true,
                        name: true
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
                        role: true,
                        name: true
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
                            role: true,
                            name: true
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
                            role: true,
                            name: true
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

export const getRole = (token?: any) => {
    if (token) {
        const decode = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const id = (decode as JwtPayload).id as string
        const role = (decode as JwtPayload).role as string
        return { role, id }
    } else {
        const token = cookies().get('token')?.value;
        if (token) {
            const decode = jwt.verify(token as string, process.env.JWT_SECRET as string);
            const id = (decode as JwtPayload).id as string
            const role = (decode as JwtPayload).role as string
            return { role, id }
        }
    }
}
