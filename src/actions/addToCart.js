'use server'

import { db } from "@/config/firebase-config";
import { addDoc, collection, } from "firebase/firestore";
import { userValidation } from './userValidation';
import { revalidatePath } from "next/cache";

export async function addToCart({ productId, variant, quantity }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        await addDoc(collection(db, "User", isValidUser.uid, "Information", "InterestedProducts", "Cart"), { productId, variant, quantity })
        revalidatePath("/cart")
        return { status: 200, message: "Product is added to your cart" }
    } catch (error) {
        console.log(error.message);
        return { status: 500, message: "Something went wrong please try again leter" };
    }
}
