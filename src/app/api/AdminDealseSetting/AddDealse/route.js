import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, addDoc, updateDoc, getDoc, query, where, doc, writeBatch, getDocs, deleteField } from "firebase/firestore";
import cloudinary from 'cloudinary';
import cloudinaryConfig from "@/config/cloudinary-config";

// Initialize Cloudinary
cloudinary.config(cloudinaryConfig);

export const dynamic = "force-dynamic"
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

// async function uploadImageToCloudinary(imageBuffer) {
//     return new Promise((resolve, reject) => {
//         cloudinary.v2.uploader.upload_stream(
//             { resource_type: 'auto', folder: 'E-Commerce' },
//             (error, result) => {
//                 if (error) {
//                     console.error('Error uploading image:', error);
//                     reject(error);
//                 } else {
//                     resolve(result.url || '');
//                 }
//             }
//         ).end(Buffer.from(imageBuffer));
//     });
// }

async function updateDocumentsInBatch(collectionPath, queryField, queryValue, updateDetails, merge) {
    const querySnapshotQuery = query(collection(db, collectionPath), where(queryField, "==", queryValue));
    const querySnapshot = await getDocs(querySnapshotQuery)
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        if (merge && doc.data().variants.length && (typeof doc.data().price !== 'number')) {
            const variants = mergeVariants(doc.data().variants, updateDetails.variants)
            batch.update(docRef, { ...updateDetails, variants: variants, discount: deleteField() });
        }
        else {
            batch.update(docRef, updateDetails);
        }
    });

    await batch.commit();
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const body = JSON.parse(formData.get("body"));

        const imgUrlPromises = [];
        const updatePromises = [];
        // console.log(body.bannerProduct)

        // const imgUrlsMap = imgUrlPromises.reduce((acc, imgUrl) => {
        //     acc[imgUrl.productId] = {
        //         mobileImageUrl: imgUrl.mobileViewURL || '',
        //         pcImageUrl: imgUrl.pcViewURL || '',
        //     };
        //     return acc;
        // }, {});

        const bannerProduct = body.bannerProduct.map(({ product, ...obj }) => {
            // return { ...obj, ...product, ...imgUrlsMap[product.productId] }
            return { ...obj, ...product }
        });


        for (const element of bannerProduct) {
            if (element.dealId === undefined) {
                const mobileViewImg = JSON.parse(formData.get("imgUrls")).mobileView;
                const pcViewImg = JSON.parse(formData.get("imgUrls")).pcView;
                // const mobileViewImg = formData.get(`${element.productId} mobileView`);
                // const pcViewImg = formData.get(`${element.productId} pcView`);
                // console.log(mobileViewImg, pcViewImg)
                if (mobileViewImg !== null && pcViewImg !== null) {

                    // const [mobileFileBuffer, pcFileBuffer] = await Promise.all([
                    //     mobileViewImg.arrayBuffer(),
                    //     pcViewImg.arrayBuffer(),
                    // ]);

                    // const [mobileViewURL, pcViewURL] = await Promise.all([
                    //     uploadImageToCloudinary(mobileFileBuffer),
                    //     uploadImageToCloudinary(pcFileBuffer),
                    // ]);
                    console.log(mobileViewImg, pcViewImg, JSON.parse(formData.get("imgUrls")))
                    imgUrlPromises.push({
                        productId: element.productId,
                        mobileViewURL: mobileViewImg,
                        pcViewURL: pcViewImg,
                    });
                }
            }
        }


        for (const { product, dealId } of body.bannerProduct) {
            if (dealId === undefined && imgUrlPromises.length) {
                const dataTobeUpdated = product.variants.length === 0 || product.variants === '' ? { discount: product.discount, } : { variants: product.variants };
                updatePromises.push(
                    await addDoc(collection(db, "SpecialDealseBannerProduct"), { ...product, discount: null, ...imgUrlPromises.filter(e => e.productId === product.productId)[0] }),
                    updateDocumentsInBatch("Administration/Admin/Revenue", "productId", product.productId, dataTobeUpdated, false),
                    updateDocumentsInBatch("ProductSnapDetails", "productId", product.productId, { dealProduct: true, ...dataTobeUpdated }, true),
                    (async () => {
                        const productDocSnapshot = await getDoc(doc(db, "products", product.productId));
                        if (productDocSnapshot.exists()) {
                            const docRef = productDocSnapshot.ref;
                            const variant = productDocSnapshot.data().variants.length && mergeVariants(productDocSnapshot.data().variants, dataTobeUpdated.variants)
                            if (productDocSnapshot.data().variants.length) {
                                await updateDoc(docRef, { dealProduct: true, variants: variant });
                            } else {
                                await updateDoc(docRef, { dealProduct: true, ...dataTobeUpdated });
                            }
                        }
                    })()
                );
            }
        }

        for (const product of body.selectedProducts) {
            if (product.dealId === undefined) {
                const dataTobeUpdated = product.variants.length === 0 || product.variants === '' ? { discount: product.discount, variants: [] } : { variants: product.variants, discount: null };
                updatePromises.push(
                    await addDoc(collection(db, "SpecialDealseSelectedProducts"), { ...product, ...dataTobeUpdated }),
                    updateDocumentsInBatch("Administration/Admin/Revenue", "productId", product.productId, dataTobeUpdated, false),
                    updateDocumentsInBatch("ProductSnapDetails", "productId", product.productId, { dealProduct: true, ...dataTobeUpdated }, true),
                    (async () => {
                        const productDocSnapshot = await getDoc(doc(db, "products", product.productId));
                        if (productDocSnapshot.exists()) {
                            const docRef = productDocSnapshot.ref;
                            const variant = productDocSnapshot.data().variants.length && mergeVariants(productDocSnapshot.data().variants, dataTobeUpdated.variants)
                            if (productDocSnapshot.data().variants.length) {
                                await updateDoc(docRef, { dealProduct: true, variants: variant });
                            } else {
                                await updateDoc(docRef, { dealProduct: true, ...dataTobeUpdated });

                            }
                        }
                    })()
                );
            }
        }

        await Promise.all(updatePromises);

        return NextResponse.json({ status: 200 });
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
