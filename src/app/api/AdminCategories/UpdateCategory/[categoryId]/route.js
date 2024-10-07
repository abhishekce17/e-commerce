import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export async function POST(req, { params }) {
    const capitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    try {

        const queryCategoryID = params.categoryId
        const categoryDocSnapshot = await getDoc(doc(db, "Administration", "Admin", "Category", queryCategoryID));

        const body = await req.json()
        const CategorySnapShot = { ...categoryDocSnapshot.data(), ...body }
        const CategorySnapShotRef = doc(db, "Administration", "Admin", "Category", queryCategoryID);
        await updateDoc(CategorySnapShotRef, CategorySnapShot);
        return NextResponse.json({ status: 200 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}

