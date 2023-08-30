import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, doc, getDoc, updateDoc, getDocs, query, where, writeBatch } from "firebase/firestore";

// Function to update documents in a batch

function mergeVariants(oldVariant, newVariant) {
    return oldVariant.map(oldItem => {
        const newItem = newVariant.find(item => item.title === oldItem.title);

        if (newItem) {
            const mergedType = oldItem.type.map(oldType => {
                const newType = newItem.type.find(type => { return type.variant === oldType.variant });
                if (newType) {
                    return { ...oldType, ...newType };
                } else {
                    return oldType;
                }
            });
            return {
                title: oldItem.title,
                type: mergedType
            };

        } else {
            return oldItem;
        }
    });
}

async function updateDocumentsInBatch(collectionPath, queryField, queryValue, updateDetails) {
    const querySnapshot = await getDocs(query(collection(db, collectionPath), where(queryField, "==", queryValue)));

    const batch = writeBatch(db)
    querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        batch.update(docRef, updateDetails);
    });

    await batch.commit();
}

// Function to update stock and variant info
async function updateStockAndVariant(details, abstractInfo) {
    await updateDocumentsInBatch("Administration/Admin/Revenue", "productId", details.productId, {
        ...details,
        stock: details.stock || 0,
        variants: details.variants || []
    });


    const querySnapshot = await getDocs(query(collection(db, "ProductSnapDetails"), where("productId", "==", details.productId)));
    querySnapshot.forEach(async (doc) => {

        await updateDocumentsInBatch("ProductSnapDetails", "productId", details.productId, {
            ...details,
            stock: details.stock || 0,
            variants: mergeVariants(doc.data().variants, abstractInfo) || []
        });
    });


    const productDocSnapshot = await getDoc(doc(db, "products", details.productId));
    if (productDocSnapshot.exists()) {
        const docRef = productDocSnapshot.ref;
        await updateDoc(docRef, {
            ...details,
            stock: details.stock || 0,
            variants: mergeVariants(productDocSnapshot.data().variants, abstractInfo) || []
        });
    }
}

// Handle POST request
export async function POST(req) {
    try {
        const body = await req.json();
        // Update each product's stock a    nd variant info
        await Promise.all(body.data.map(async (element) => {
            const abstractInfo = element.variants.map(({ type, sold, totalRevenue, ...rest }) => ({
                ...rest,
                type: type.map(({ sold, revenue, ...typeRest }) => typeRest)
            }));

            await updateStockAndVariant(element, abstractInfo);
        }));

        return NextResponse.json({ status: 200 });
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
