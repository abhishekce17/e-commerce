import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic"
export async function GET() {
    try {
        let fetchData = []
        const querySnapshotPromis = new Promise(async (resolve, reject) => {
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
                fetchData.push({ ...doc.data(), productId: doc.id })
            });
            if (querySnapshot.size === fetchData.length) resolve()
        })
        await querySnapshotPromis
        return NextResponse.json({ data: fetchData })
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}