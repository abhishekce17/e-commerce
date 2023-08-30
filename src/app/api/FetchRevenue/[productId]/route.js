import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req, { params }) {
    try {
        const fetchData = [];
        const revenueCollectionRef = collection(db, "Administration", "Admin", "Revenue");
        const q = query(revenueCollectionRef, where("productId", "==", params.productId));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            fetchData.push({ ...doc.data() });
        });
        return NextResponse.json({ data: fetchData, status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500, error });
    }
}
