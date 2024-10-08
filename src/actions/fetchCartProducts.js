'use server'
import _ from "lodash";
import { userValidation } from "./userValidation";
import { fetchCollectionData } from "./fetchCollectionData";
import { fetchCollectionWithWhere } from "./fetchCollectionWithWhere";

const getPrice = (variants, variant) => {
    const otp = variants.filter((ele) => {
        for (const key in variant) {
            if (key === ele.title && ele.type.some((x) => "price" in x)) {
                return true;
            }
        }
        return false;
    });
    return otp[0]?.type.filter(x => x.variant === variant[otp[0].title])[0];
};

export async function fetchCartProducts() {
    try {
        const isValidUser = await userValidation()
        if (isValidUser.status !== 200) {
            return isValidUser;
        }


        const cartProductsFetch = await fetchCollectionData({ collectionName: `User/${isValidUser.uid}/Information/InterestedProducts/Cart` });
        const cartProductsIds = cartProductsFetch.map(x => x.productId);
        const rawCartProductsData = await fetchCollectionWithWhere({ collectionName: "ProductSnapDetails", fieldPath: "productId", fieldPathValue: cartProductsIds, condition: "in", orderFieldValue: "productName" });
        let totalAmount = 0, totalItems = 0;
        let savedItems = [];
        const cartProduct = rawCartProductsData.map((data, index) => {
            const { variant, quantity, saveForLater, docId } = cartProductsFetch.find(x => x.productId === data.productId);
            let Obj;
            if (!_.isEmpty(data?.variants)) {
                Obj = getPrice(data.variants, variant);
            }
            const products = {
                ...data,
                ...Obj,
                snapId: data.docId,
                docId,
                variant,
                quantity,
                saveForLater
            };
            if (saveForLater) {
                savedItems.push(products);
            } else {
                totalAmount += parseInt((products.price - products.price * products.discount / 100) * quantity);
                totalItems += quantity;
            }
            return products;
        })
        return { status: 200, Cart: cartProduct.filter(product => !product?.saveForLater), totalAmount, totalItems, savedItems };
    } catch (error) {
        console.log("Error:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}