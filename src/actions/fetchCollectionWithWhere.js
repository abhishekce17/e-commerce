"use server"
import { db } from "@/config/firebase-config";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export const fetchCollectionWithWhere = async ({ collectionName, limitNo, fieldPath, fieldPathValue, condition, orderFieldValue }) => {
    try {
        const queryFetch = limitNo ?
            query(collection(db, collectionName), where(fieldPath, condition, fieldPathValue), orderBy(orderFieldValue), limit(limitNo)) :
            query(collection(db, collectionName), where(fieldPath, condition, fieldPathValue), orderBy(orderFieldValue));
        const querySnapshot = await getDocs(queryFetch);
        return querySnapshot.docs.map(doc => { return { ...doc.data(), docId: doc.id } });
    } catch (error) {
        console.log(`Error while fetching ${collectionName} : ` + error);
        return [];
    }
}