"use server"

import { fetchCollectionWithWhere } from "./fetchCollectionWithWhere";


export const fetchCategoryProduct = async ({ category }) => {
    try {
        const [categoryProducts, categoryInfo] = await Promise.all([
            fetchCollectionWithWhere({
                collectionName: "ProductSnapDetails",
                condition: "==",
                fieldPath: "category",
                fieldPathValue: category,
                limitNo: 15,
                orderFieldValue: "productName"
            }),
            fetchCollectionWithWhere({
                collectionName: "Administration/Admin/Category",
                condition: "==",
                fieldPath: "category",
                fieldPathValue: category,
                orderFieldValue: "category"
            })
        ]);

        return { categoryProducts, categoryInfo, status: 200 }
    } catch (error) {
        console.log(error);
        return { categoryProducts: [], categoryInfo: [], status: 500, error: true }
    }
}
