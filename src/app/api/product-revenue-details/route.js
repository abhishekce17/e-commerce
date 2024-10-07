import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

export const dynamic = "force-dynamic"
export async function GET() {
    try {
        const productSnapshot = await getDocs(collection(db, "ProductSnapDetails"));
        const fetchData = await Promise.all(productSnapshot.docs.map(async (doc) => {
            const productData = doc.data();
            const revenueQuery = query(
                collection(db, "Administration", "Admin", "Revenue"),
                where("productId", "==", productData.productId)
            );
            const revenueSnapshot = await getDocs(revenueQuery);
            if (!revenueSnapshot.empty) {
                const revenueData = revenueSnapshot.docs[0].data();
                return { ...productData, variants: revenueData.variants };
            } else {
                return productData;
            }
        }));

        return NextResponse.json({ data: fetchData, status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500, error });
    }
}
