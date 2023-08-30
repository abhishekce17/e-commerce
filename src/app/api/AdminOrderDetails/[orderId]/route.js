import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { doc, getDoc } from "firebase/firestore";

export async function GET(res, { params }) {
    try {
        const queryOrderID = params.orderId
        const orderDocSnapshot = await getDoc(doc(db, "Administration", "Admin", "OrdersDetails", queryOrderID));

        if (!orderDocSnapshot.exists()) {
            return NextResponse.json({ status: 404, error: "Order not found." });
        }

        const orderData = { ...orderDocSnapshot.data(), orderId: orderDocSnapshot.id };

        return NextResponse.json({ data: orderData, status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error });
    }
}
