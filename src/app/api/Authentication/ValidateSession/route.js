// 'use server'
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { db } from "@/firebase-config/config";
import { verify } from 'jsonwebtoken';
import { doc, getDoc } from "firebase/firestore";
export const dynamic = 'force-static';

export async function GET(req) {
    try {
        const cookieData = cookies().get("authToken")
        const cookiePromise = new Promise((resolve) =>
            setTimeout(() => {
                resolve(cookieData)
            }, 1000)
        )
        // const authToken = cookies().get("authToken");
        const authToken = await cookiePromise;
        if (authToken === undefined) return NextResponse.json({ status: 401 })
        const userData = verify(authToken.value, process.env.AUTH_SECRETE_KEY);
        if (userData) {
            const userExistance = await getDoc(doc(db, "User", userData.uid))
            if (userExistance.exists()) {
                return NextResponse.json({ status: 200 })
            }
        }
        return NextResponse.json({ status: 401 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ status: 401, error: "Something went wrong please try again leter" });
    }
}
