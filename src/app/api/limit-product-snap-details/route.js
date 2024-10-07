import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, getDocs, limit, query } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
    try {
        let fetchData = []

        const querySnapshotPromis = new Promise(async (resolve, reject) => {
            const queryFetch = query(collection(db, "ProductSnapDetails"), limit(10))
            const querySnapshot = await getDocs(queryFetch);
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                fetchData.push({ ...doc.data(), productId: doc.data().productId })
            });
            if (querySnapshot.size === fetchData.length) resolve()
        })
        await querySnapshotPromis;
        return NextResponse.json({ data: fetchData, status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}