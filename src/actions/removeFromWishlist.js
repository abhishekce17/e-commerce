"use server"
import { db } from "@/config/firebase-config";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { userValidation } from "./userValidation";

export async function removeFromWishlist({ productId }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const userDocRef = doc(db, "User", isValidUser.uid);
        const userInfoDocRef = doc(userDocRef, "Information", "Personal");
        await updateDoc(userInfoDocRef, { wishlist: arrayRemove(productId) });
        return { status: 200, message: "Product is removed" };
    } catch (e) {
        console.log('Error:', e);
        return { status: 500, message: "Error while processing your request" };
    }
}
