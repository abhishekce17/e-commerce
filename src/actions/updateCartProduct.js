"use server"
import { db } from "@/config/firebase-config";
import { userValidation } from "./userValidation";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";

export const updateCartProduct = async ({ type, docId, quantity }) => {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        if (!type) {
            return { status: 500, message: "Invalid data" };
        }
        const cartItemDoc = doc(
            db,
            "User",
            isValidUser.uid,
            "Information",
            "InterestedProducts",
            "Cart",
            docId
        );

        const cartInfoSnap = await getDoc(cartItemDoc);
        if (cartInfoSnap.exists()) {
            if (type === "quantity") {
                await updateDoc(cartInfoSnap.ref, { quantity: increment(quantity) })
            } else if (type === "status") {
                console.log(type);
                await updateDoc(cartInfoSnap.ref, { saveForLater: !cartInfoSnap.data()?.saveForLater });
            }
        }

        return { status: 200, message: "Your cart product is updated" }
    } catch (error) {
        console.error(error.message);
        return { status: 500, message: "Something went wrong please try again leter" };
    }
}