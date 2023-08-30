import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
    try {
        const queryProductID = params.productId
        const productDocSnapshot = await getDoc(doc(db, "products", queryProductID));

        if (!productDocSnapshot.exists()) {
            return NextResponse.json({ status: 404, error: "Product not found." });
        }

        const productData = { ...productDocSnapshot.data(), productId: productDocSnapshot.id };

        return NextResponse.json({ data: productData, status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error });
    }
}
