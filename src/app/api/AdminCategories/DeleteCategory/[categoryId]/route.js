import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

export async function GET(res, { params }) {
    try {
        const queryCategoryID = params.categoryId
        await deleteDoc(doc(db, "Administration", "Admin", "Category", queryCategoryID));
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error });
    }
}
