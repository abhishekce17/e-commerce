import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, getDocs, limit, query } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
    try {
        let allCategory = []

        const categoryFetchPromise = new Promise(async (resolve, reject) => {
            const categoriesRef = await getDocs(collection(db, "Administration", "Admin", "Category"));
            categoriesRef.forEach((doc) => {
                allCategory.push(doc.data().category)
            });
            if (categoriesRef.size === allCategory.length) resolve()
        })
        await categoryFetchPromise;
        return NextResponse.json({ ctgry: allCategory, status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}