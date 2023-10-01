import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, addDoc, doc, setDoc, where, query, updateDoc, getDocs, writeBatch } from "firebase/firestore";
const cloudinary = require('cloudinary');


//Adding Orders Snap Details
// export async function POST(req) {
//     try {
//         let body = await req.json()
//         let customerSnapDetails = {
//             customerName: body.customerName,
//             contact: body.contact,
//             totalOrders: body.totalOrders,
//             recentOrder: body.recentOrder,
//             customerId: body.customerId
//         }

//         const RevenueSnapDetailsRef = collection(db, "Administration", "Admin", "CustomerSnapDetails")
//         await addDoc(RevenueSnapDetailsRef, customerSnapDetails)

//         return NextResponse.json({ status: 200 })
//     } catch (e) {
//         console.log('Error:', e);
//         return NextResponse.json({ status: 500, error: e });
//     }
// }




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

// export async function POST(req) {
//     // const body = await req.json()
//     const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
//     const ReportYear = 2023;

//     // Create a batched write
//     const batch = writeBatch(db);

//     for (const eachMonth of months) {
//         const q = query(collection(db, `Administration/YearlyReport/ReportData/UR1vAqd8cSpJeq9gjGGY/${eachMonth}`), where("productId", "==", "product id"));
//         const querySnapshot = await getDocs(q);

//         querySnapshot.forEach((docSnapshot) => {
//             const docRef = doc(db, `Administration/YearlyReport/ReportData/UR1vAqd8cSpJeq9gjGGY/${eachMonth}`, docSnapshot.id);
//             // Queue the update operation in the batch
//             batch.update(docRef, { totalRevenueGenerated: 658433215, totalOrder: 221565 });
//         });
//     }

//     // Commit the batched write to update all documents
//     await batch.commit();
//     return NextResponse.json({ status: "doc added succssefully" })
// }