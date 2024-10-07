import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const dynamic = "force-dynamic"
export async function GET() {
    try {
        const fetchData = [];
        const querySnapshot = await getDocs(collection(db, "FeaturedProduct"));
        // console.log("Fetching All featured products");

        const fetchPromises = querySnapshot.docs.map(async (docData) => {
            try {
                const productDocRef = collection(db, "ProductSnapDetails");
                const productDocSnapQuery = query(productDocRef, where("productId", "==", docData.data().productId));
                const productDocSnapshot = await getDocs(productDocSnapQuery);
                productDocSnapshot.forEach((doc) => {
                    fetchData.push({ ...doc.data(), FeaturedId: docData.id });
                })
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        });

        await Promise.all(fetchPromises);

        return NextResponse.json({ data: fetchData, status: 200 });
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return NextResponse.json({ status: 500, error });
    }
}
