import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        req.cookies.clear();
        cookies().delete('token')
        return NextResponse.json({ message: 'تسجيل الخروج بنجاح' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: 'There is error in server' }, { status: 400 })
    }
}