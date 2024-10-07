import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
    const capitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    try {
        const body = await req.json()
        console.log(body)
        const CategorySnapShotRef = doc(db, "Administration", "Admin", "Deliverable", "pincodes")
        await setDoc(CategorySnapShotRef, { pincodes: body.data })
        return NextResponse.json({ status: 200 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}

