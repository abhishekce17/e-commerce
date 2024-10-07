"use server"
import { db } from "@/config/firebase-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { userValidation } from "./userValidation";

export async function addToWishlist({ productId }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const userDocRef = doc(db, "User", isValidUser.uid);
        const userInfoDocRef = doc(userDocRef, "Information", "Personal");

        await updateDoc(userInfoDocRef, { wishlist: arrayUnion(productId) });
        return { status: 200, message: "Added to wishlist" };
    } catch (e) {
        console.error('Error:', e);
        return { status: 500, message: "Error while adding to the wishlist" };
    }
}
