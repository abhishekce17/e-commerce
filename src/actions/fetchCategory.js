"use server"

import { fetchCollectionData } from "./fetchCollectionData"

export const fetchCategory = async () => {
    try {
        const categoryInfo = await fetchCollectionData({ collectionName: "Administration/Admin/Category" });
        return categoryInfo.map(x => ({ category: x.category, docId: x.docId }));
    } catch (e) {
        console.log(e);
        return [];
    }
}
