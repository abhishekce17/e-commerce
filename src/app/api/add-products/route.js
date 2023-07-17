import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, addDoc } from "firebase/firestore";

export async function POST() {
    try {
        const docRef = await addDoc(collection(db, "products"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        return NextResponse.json({ message: "Product is added into data base" })
    } catch (e) {
        return NextResponse.json({ message: "Something went wrong" })
    }
}