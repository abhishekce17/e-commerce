"use server"
import { db } from "@/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export async function fetchProductDetails({ productId }) {
    try {
        const productDocSnapshot = await getDoc(doc(db, "products", productId));
        const reviewSnapshot = await getDoc(doc(db, "ProductsReviewsAndRatings", productId));

        if (!productDocSnapshot.exists()) {
            return { status: 404, message: "Product not found." };
        }

        const productData = { ...productDocSnapshot.data(), productId: productDocSnapshot.id, ReviewRatingArray: reviewSnapshot.data()?.RatingsAndReviewsArray || [] };
        return { data: productData, status: 200 };
    } catch (error) {
        console.log(error)
        return { status: 500, message: "We are having some issue at this moment" };
    }
}
