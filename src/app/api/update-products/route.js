import {NextResponse} from "next/server";
import {db} from "@/firebase-config/config";
import {collection, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
const cloudinary = require('cloudinary');
import cloudinary_config from "@/cloudinary-config/config";
import {updateToIndex} from "@/algolia";

export const dynamic = "force-dynamic"
function updateVariantType(oldVariant, newVariant) {
    const updatedDataVariant = [];

    for (const newValue of newVariant) {
        const matchingOldValue = oldVariant.find(oldValue => oldValue.title === newValue.title);

        if (matchingOldValue) {
            const updatedType = []
            newValue.type.forEach(newType => {
                const matchingOldType = matchingOldValue.type.find(oldType => oldType.variant === newType.variant);

                if (matchingOldType) {
                    return updatedType.push({...matchingOldType, ...newType});
                } else if ('price' in newType) {
                    if (newType.price !== null) {
                        return updatedType.push({...newType});
                    }
                }
            });

            updatedDataVariant.push({...matchingOldValue, type: updatedType});
        } else {
            const updatedType = newValue.type.filter(types => 'price' in types && types.price !== null);

            updatedDataVariant.push({...newValue, type: updatedType});
        }
    }

    return updatedDataVariant.filter(e => e.type.length !== 0);
}

async function updateRevenue(details, productId, docName) {
    const productSnapDetailsRef = collection(db, docName)
    const q = query(productSnapDetailsRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        const variant = updateVariantType(doc.data().variants, details.variants).filter(e => e.type.length !== 0)
        updateDoc(docRef, {...doc.data(), ...details, variants: variant});
    });
}


export async function POST(req) {
    try {
        console.log("calling update funtion")
        // let imgUrl = []
        const formData = await req.formData();
        const body = JSON.parse(formData.get("body"))
        // const imgFileArray = formData.getAll("file")
        // const urlPromise = new Promise((resolve, reject) => {
        //     imgFileArray.forEach(async (imgFile) => {
        //         console.log("Image uploading")
        //         const fileBuffer = await imgFile.arrayBuffer();
        //         const buffer = Buffer.from(fileBuffer);
        //         const stream = cloudinary.v2.uploader.upload_stream(
        //             { resource_type: 'auto', folder: 'E-Commerce' }, // Cloudinary options
        //             (error, result) => {
        //                 if (error) {
        //                     console.error('Error uploading image:', error);
        //                     NextResponse.json({ status: 500, error })
        //                     return reject(error)
        //                 } else {
        //                     imgUrl.push(result.url)
        //                     if (imgFileArray.length === imgUrl.length) resolve()
        //                 }
        //             }
        //         );
        //         stream.end(buffer);
        //     })
        // })
        // if (imgFileArray.length) {
        //     await urlPromise
        // }
        body.imgURLs = [...body.imgURLs, ...JSON.parse(formData.get("imgUrls"))]
        const productId = formData.get("productId");
        const productRef = doc(db, "products", productId);
        await setDoc(productRef, body); // Use setDoc to create a new document or update an existing one.

        let snapShot = {
            productId: productId,
            category: body.category,
            productName: body.productName,
            productFirtsImgURL: body.imgURLs[0],
            discount: body.discount || "",
            price: body.price || "",
            variants: body.variants || "",
            stock: 0,
            brandName: body.brandName || "",
            allTags: body.allTags
        }

        const productSnapDetails = {
            ...snapShot,
            averageRating: body.averageRating//fetch from API of Reviews and Rating ,
        }

        // update(productSnapDetails, productId, "ProductSnapDetails")

        const productSnapDetailsRef = collection(db, "ProductSnapDetails")
        const q = query(productSnapDetailsRef, where("productId", "==", productId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const docRef = doc.ref;
            updateDoc(docRef, productSnapDetails);
        });

        updateToIndex(productSnapDetails, productId);

        const RevenueSnapDetails = {
            ...snapShot,
            sold: 0,
            totalRevenue: 0
        }
        updateRevenue(RevenueSnapDetails, productId, "Administration/Admin/Revenue")

        return NextResponse.json({status: 200})
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({status: 500, error: e});
    }
}