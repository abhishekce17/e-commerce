import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc, deleteField } from "firebase/firestore";

export async function DELETE(req, { params }) {
    try {
        const dealIdArray = params.dealIdArray; // Assuming an array of dealIds is passed in the request body
        const dealIds = JSON.parse(decodeURIComponent(dealIdArray))
        // console.log(dealIds)
        // Iterate through the array of dealIds
        for (const dealId of dealIds) {
            // Fetch the selected product document
            const selectedProductDocRef = doc(db, "SpecialDealseSelectedProducts", dealId);
            const selectedProductDocSnapshot = await getDoc(selectedProductDocRef);
            // console.log(selectedProductDocSnapshot.data())
            if (selectedProductDocSnapshot.exists()) {
                const selectedProductData = selectedProductDocSnapshot.data();
                const productId = selectedProductData.productId;
                const initialDiscount = selectedProductData.initialDiscount;
                if (selectedProductData.variants.length && (initialDiscount === null || initialDiscount === "")) {

                    console.log("Variants Exists\nVariants =>", selectedProductData.variants)
                }
                else {
                    console.log("Variants doesn't Exists\nInitial Discount =>", selectedProductData.initialDiscount)

                }
                // console.log(typeof initialDiscount)
                //         // Update related documents and remove initialDiscount
                //         const relatedCollections = ["Administration/Admin/Revenue", "ProductSnapDetails"];
                //         for (const collectionPath of relatedCollections) {
                //             const querySnapshotQuery = query(collection(db, collectionPath), where("productId", "==", productId));
                //             const querySnapshot = await getDocs(querySnapshotQuery);

                //             querySnapshot.forEach(async (doc) => {
                //                 const docRef = doc.ref;
                //                 await updateDoc(docRef, {
                //                     discount: initialDiscount,
                //                     initialDiscount: deleteField(),
                //                     dealProduct : deleteField(),
                //                 });
                //             });
                //         }

                //         // Update the actual product document
                //         const productDocRef = doc(db, "products", productId);
                //         const productDocSnapshot = await getDoc(productDocRef);
                //         if (productDocSnapshot.exists()) {
                //             const productData = productDocSnapshot.data();

                //             // Update main product discount
                //             await updateDoc(productDocRef, {
                //                 discount: initialDiscount,
                //                 initialDiscount: deleteField(),
                //                 dealProduct : deleteField(),
                //                 productId : deleteField(),
                //                 productFirtsImgURL : deleteField()
                //             });

                // //             // Update variant discounts
                //             if (productData.variant && Array.isArray(productData.variant)) {
                //                 productData.variant.forEach(variant => {
                //                     if (variant.type && Array.isArray(variant.type)) {
                //                         variant.type.forEach(subVariant => {
                //                             subVariant.discount = initialDiscount;
                //                             delete subVariant.initialDiscount;
                //                         });
                //                     }
                //                 });

                //                 // Update the product document with modified variant data
                //                 await updateDoc(productDocRef, {
                //                     variant: productData.variant,
                //                 });
                //             }
                //         }

                //         // Delete selected product document
                // await deleteDoc(selectedProductDocRef);
            }
        }

        return NextResponse.json({ status: 200, message: "Selected products removed and discounts updated." });
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
