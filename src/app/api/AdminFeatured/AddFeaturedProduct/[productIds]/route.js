import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export async function GET(req, { params }) {
    try {
        const productIdArray = params.productIds;
        const productIds = JSON.parse(decodeURIComponent(productIdArray));

        const featuredProductsRef = collection(db, "FeaturedProduct");

        // Iterate through each product ID and create a featured product document
        for (const productId of productIds) {
            const docQuery = query(featuredProductsRef, where("productId", "==", productId))
            const queryData = await getDocs(docQuery)
            if (!queryData.size) {
                const featuredProductData = {
                    productId: productId,
                };
                await addDoc(featuredProductsRef, featuredProductData);
            }
        }

        return NextResponse.json({ status: 200, message: "Featured products added." });
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
