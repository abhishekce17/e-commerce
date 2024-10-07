import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
    const capitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    try {
        const body = await req.json()
        body.map(async element => {
            const CategorySnapShot = {
                category: capitalizeString(element.category),
                categoryBrands: element.categoryBrands,
                defaultVariants: element.defaultVariants,
                filterTags: element.filterTags,
                productCount: 0,
                categorySales: 0,
                totalSaleAmount: 0,
            }
            const CategorySnapShotRef = collection(db, "Administration", "Admin", "Category")
            await addDoc(CategorySnapShotRef, CategorySnapShot)
        });

        return NextResponse.json({ status: 200 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}

