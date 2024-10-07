import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function DELETE(req, { params }) {
    try {
        const featuredProductIdArray = params.featuredDocId; // Assuming the featured product document ID is passed as a query parameter
        const featuredProductIds = JSON.parse(decodeURIComponent(featuredProductIdArray));

        featuredProductIds.forEach(async featuredProductId => {
            const featuredProductDocRef = doc(db, "FeaturedProduct", featuredProductId);
            const featuredProductDocSnapshot = await getDoc(featuredProductDocRef);
            if (featuredProductDocSnapshot.exists()) {
                await deleteDoc(featuredProductDocRef);
            }
        });
        return NextResponse.json({ status: 200, message: "Featured product deleted." });
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
