import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc, deleteField } from "firebase/firestore";
import cloudinary from 'cloudinary';
import cloudinary_config from "@/cloudinary-config/config";

export async function DELETE(req, { params }) {
    try {
        const dealId = params.dealId; // Assuming the dealId is passed in the request body

        // Fetch the banner product document
        const bannerProductDocRef = doc(db, "SpecialDealseBannerProduct", dealId);
        const bannerProductDocSnapshot = await getDoc(bannerProductDocRef);

        if (bannerProductDocSnapshot.exists()) {
            const bannerProductData = bannerProductDocSnapshot.data();
            const productId = bannerProductData.productId;
            const initialDiscount = bannerProductData.initialDiscount || bannerProductData.discount;

            // Update the actual product document
            const productDocRef = doc(db, "products", productId);
            const productDocSnapshot = await getDoc(productDocRef);
            if (productDocSnapshot.exists()) {
                const productData = productDocSnapshot.data();

                // Update main product discount
                await updateDoc(productDocRef, {
                    discount: initialDiscount,
                    dealProduct: deleteField(),
                    productFirtsImgURL: deleteField(),
                    productId: deleteField(),
                });

                // Update variant discounts
                if (productData.variants && Array.isArray(productData.variants)) {
                    productData.variants.map(variant => {
                        if (variant.type && Array.isArray(variant.type)) {
                            variant.type.map(subVariant => {
                                if (subVariant.discount !== undefined) {
                                    subVariant.discount = subVariant.initialDiscount || subVariant.discount;
                                    delete subVariant.initialDiscount;
                                    delete subVariant.netValue;
                                }
                            });
                        }
                    });
                    // Update the product document with modified variant data
                    await updateDoc(productDocRef, {
                        variants: productData.variants,
                    });
                }

                // Update related documents and remove initialDiscount
                const relatedCollections = ["Administration/Admin/Revenue", "ProductSnapDetails"];
                for (const collectionPath of relatedCollections) {
                    const querySnapshotQuery = query(collection(db, collectionPath), where("productId", "==", productId));
                    const querySnapshot = await getDocs(querySnapshotQuery);

                    querySnapshot.forEach(async (doc) => {
                        const docRef = doc.ref;
                        await updateDoc(docRef, {
                            discount: initialDiscount,
                            variants: productData.variants.filter((x) => x.type.some((val) => "price" in val)),
                            initialDiscount: deleteField(),
                            dealProduct: deleteField()
                        });
                    });
                }

            }

            //Deleting Image from the cloud storage
            cloudinary.config(cloudinary_config);
            const imgURL = [bannerProductData.mobileViewURL, bannerProductData.pcViewURL]
            const imgURI = imgURL.map(url => {
                const lastIndex = url.lastIndexOf('/');
                return `E-Commerce/${url.slice(lastIndex + 1).split(".")[0]}`;
            });
            cloudinary.v2.api.delete_resources(imgURI,
                { type: 'upload', resource_type: 'image' })

            // Delete banner product document
            await deleteDoc(bannerProductDocRef);

            return NextResponse.json({ status: 200, message: "Banner product removed and discounts updated." });
        } else {
            return NextResponse.json({ status: 404, message: "Banner product not found." });
        }
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
