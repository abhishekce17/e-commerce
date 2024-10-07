import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
    try {
        let fetchData = []
        const querySnapshot = await getDocs(collection(db, "ProductSnapDetails"));
        fetchData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            productId: doc.data().productId
        }));
        return NextResponse.json({ data: fetchData, status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}