// 'use server'
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { db } from "@/config/firebase-config";
import { verify } from 'jsonwebtoken';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export const dynamic = 'force-dynamic'
export async function POST(req) {
    try {
        const authToken = cookies().get("authToken");
        if (authToken === undefined) return NextResponse.json({ status: 401 })
        const userData = verify(authToken.value, process.env.AUTH_SECRET_KEY);
        if (userData) {
            const userExistance = await getDoc(doc(db, "User", userData.uid))
            if (userExistance.exists()) {
                const { productId, variant } = await req.json()
                await addDoc(collection(db, "User", userData.uid, "Information", "InterestedProducts", "Cart"), { productId, variant, quantity: 1 })
                return NextResponse.json({ status: 200 })
            }
        }
        return NextResponse.json({ status: 401 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ status: 401, error: "Something went wrong please try again leter" });
    }
}
