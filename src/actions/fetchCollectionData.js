"use server"
import { db } from "@/config/firebase-config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export const fetchCollectionData = async ({ collectionName, limitNo }) => {
    try {
        const queryFetch = limitNo ?
            query(collection(db, collectionName), limit(limitNo)) :
            collection(db, collectionName);
        const querySnapshot = await getDocs(queryFetch);
        return querySnapshot.docs.map(doc => { return { ...doc.data(), docId: doc.id } });
    } catch (error) {
        console.log(`Error while fetching ${collectionName} : ` + error);
        return [];
    }
}