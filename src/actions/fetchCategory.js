"use server"

import { fetchCollectionData } from "./fetchCollectionData"

export const fetchCategory = async () => {
    try {
        const categoryInfo = await fetchCollectionData({ collectionName: "Administration/Admin/Category" });
        return categoryInfo.map(x => x.category);
    } catch (e) {
        console.log(e);
        return [];
    }
}
