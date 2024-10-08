'use server'
import { db } from "@/config/firebase-config";
import {
    getDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
import { userValidation } from "./userValidation";

export async function removeCartItem({ cartProductId }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const cartItemDoc = doc(
            db,
            "User",
            isValidUser.uid,
            "Information",
            "InterestedProducts",
            "Cart",
            cartProductId
        );

        const cartInfoSnap = await getDoc(cartItemDoc);

        if (cartInfoSnap.exists()) {
            await deleteDoc(cartItemDoc);
            return { status: 200, message: "Item removed from cart" };
        } else {
            return { status: 404, message: "Cart item not found" };
        }
    } catch (error) {
        console.log("Error:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}