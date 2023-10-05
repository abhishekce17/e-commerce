import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc, deleteField } from "firebase/firestore";

// ... (import statements)

export async function DELETE(req, { params }) {
    try {
        console.log("Calling REMOVE FUNCTION");
        const dealIdArray = params.dealIdArray;
        const dealIds = JSON.parse(decodeURIComponent(dealIdArray));

        for (const dealId of dealIds) {
            const selectedProductDocRef = doc(db, "SpecialDealseSelectedProducts", dealId);
            const selectedProductDocSnapshot = await getDoc(selectedProductDocRef);

            if (selectedProductDocSnapshot.exists()) {
                const selectedProductData = selectedProductDocSnapshot.data();
                const productId = selectedProductData.productId;
                const initialDiscount = selectedProductData.initialDiscount || selectedProductData.discount;

                const relatedCollections = ["Administration/Admin/Revenue", "ProductSnapDetails"];

                for (const collectionPath of relatedCollections) {
                    const querySnapshotQuery = query(collection(db, collectionPath), where("productId", "==", productId));
                    const querySnapshot = await getDocs(querySnapshotQuery);

                    querySnapshot.forEach(async (doc) => {
                        const docRef = doc.ref;

                        if (selectedProductData.variants.length) {
                            const variantData = doc.data().variants;

                            variantData.map(variant => {
                                if (variant.type && Array.isArray(variant.type)) {
                                    variant.type.map(subVariant => {
                                        if (subVariant.price !== undefined && subVariant.price !== null) {
                                            subVariant.discount = subVariant.initialDiscount || subVariant.discount;
                                            delete subVariant.initialDiscount;
                                        }
                                    });
                                }
                            });
                            // console.log(variantData[0].type)
                            await updateDoc(docRef, {
                                variants: variantData,
                                initialDiscount: deleteField(),
                                dealProduct: deleteField(),
                            });
                        } else {
                            await updateDoc(docRef, {
                                discount: initialDiscount,
                                initialDiscount: deleteField(),
                                dealProduct: deleteField(),
                            });
                        }
                    });
                }

                const productDocRef = doc(db, "products", productId);
                const productDocSnapshot = await getDoc(productDocRef);

                if (productDocSnapshot.exists()) {
                    const productData = productDocSnapshot.data();
                    let dataToUpdate = {
                        discount: initialDiscount || null,
                        initialDiscount: deleteField(),
                        dealProduct: deleteField(),
                        productId: deleteField(),
                        productFirtsImgURL: deleteField(),
                    };

                    if (productData.variants && Array.isArray(productData.variants)) {
                        const variantData = productData.variants;

                        variantData.map(variant => {
                            if (variant.type && Array.isArray(variant.type)) {
                                variant.type.map(subVariant => {
                                    if (subVariant.price !== undefined && subVariant.price !== null) {
                                        subVariant.discount = subVariant.initialDiscount || subVariant.discount;
                                        delete subVariant.initialDiscount;
                                    }
                                });
                            }
                        });

                        dataToUpdate = { ...dataToUpdate, variants: variantData, discount: null };
                    }
                    console.log(dataToUpdate)
                    await updateDoc(productDocRef, dataToUpdate);
                    await deleteDoc(selectedProductDocRef);
                }
            }
        }

        return NextResponse.json({ status: 200, message: "Selected products removed and discounts updated." });
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}


