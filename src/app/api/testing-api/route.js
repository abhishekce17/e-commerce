import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, addDoc } from "firebase/firestore";
const cloudinary = require('cloudinary');


//Adding Orders Snap Details
export async function POST(req) {
    try {
        let body = await req.json()
        let customerSnapDetails = {
            customerName: body.customerName,
            contact: body.contact,
            totalOrders: body.totalOrders,
            recentOrder: body.recentOrder,
            customerId: body.customerId
        }

        const RevenueSnapDetailsRef = collection(db, "Administration", "Admin", "CustomerSnapDetails")
        await addDoc(RevenueSnapDetailsRef, customerSnapDetails)

        return NextResponse.json({ status: 200 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}




//Adding Orders Details
// export async function POST(req) {
//     try {
//         const body = await req.json()
//         const order = {
//             customerId: body.customerId,
//             orderDate: new Date('2023-08-16T10:00:00'),
//             shippingAddress: body.shippingAddress,
//             billingAddress: body.billingAddress,
//             totalAmount: body.totalAmount,
//             paymentMethod: body.paymentMethod,
//             items: body.items,
//             orderStatus: "Pending",
//             customerContact: body.customerContact
//         };

//         const RevenueSnapDetailsRef = collection(db, "Administration", "Admin", "OrdersDetails")
//         await addDoc(RevenueSnapDetailsRef, order)

//         return NextResponse.json({ status: 200 })
//     } catch (e) {
//         console.log('Error:', e);
//         return NextResponse.json({ status: 500, error: e });
//     }
// }
