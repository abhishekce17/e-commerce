"use server"

import { db } from "@/config/firebase-config";
import { doc, collection, getDocs } from "firebase/firestore";
import { userValidation } from "./userValidation";

export async function fetchUserDetails() {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const userDocRef = doc(db, "User", isValidUser.uid);
        const [userInfo, cartInfo, orderInfo] = await Promise.all([
            getDocs(collection(userDocRef, "Information")),
            getDocs(collection(userDocRef, "Information", "InterestedProducts", "Cart")),
            getDocs(collection(userDocRef, "Information", "OrderDetails", "OrderedProducts"))
        ]);

        const fetchedUserData = Object.fromEntries(
            userInfo.docs.map(doc => [doc.id, doc.data()])
        );

        const cart = cartInfo.docs.map(doc => doc.data());
        const orderDetails = orderInfo.docs.map(doc => doc.data());

        return {
            status: 200,
            userData: {
                ...fetchedUserData,
                Cart: cart,
                OrderDetails: JSON.parse(JSON.stringify(orderDetails))
            }
        };
    } catch (error) {
        console.error('Error fetching user details:', error);
        return { status: 500, error: "Internal server error" };
    }
}