import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic"
export async function GET() {
    let fetchData = [];

    try {
        const querySnapshot = await getDocs(collection(db, "ProductSnapDetails"));
        fetchData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            productId: doc.data().productId
        }));
        return NextResponse.json({ data: fetchData })
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}