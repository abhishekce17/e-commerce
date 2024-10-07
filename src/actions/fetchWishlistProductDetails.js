"use server"
import { fetchCollectionWithWhere } from "./fetchCollectionWithWhere";
import { userValidation } from "./userValidation";

export default async function fetchWishlistProductDetails({ wishlistArray }) {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }
        const wishlistProductsSnap = await fetchCollectionWithWhere({
            collectionName: "ProductSnapDetails",
            fieldPath: "productId",
            fieldPathValue: wishlistArray,
            condition: "in",
            orderFieldValue: "productName"
        })
        return { status: 200, wishlistProductsSnap };
    } catch (error) {
        console.log("Error : " + error);
        return { status: 500, message: "Error while processing your request" };
    }
}
