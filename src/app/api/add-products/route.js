import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
const cloudinary = require('cloudinary');
import cloudinary_config from "@/cloudinary-config/config";
import streamifier from "streamifier"
import fs from "fs"

export const dynamic = "force-dynamic";
export async function POST(req) {
    try {
        let imgUrl = [];
        const formData = await req.formData();
        const body = JSON.parse(formData.get("body"));
        const imgFileArray = formData.getAll("file");

        for (const imgFile of imgFileArray) {
            const fileBuffer = await imgFile.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);

            // Create a temporary file and write the buffer data to it
            const tempFilePath = "../../../../tmp"; // Replace with the actual path
            fs.writeFileSync(tempFilePath, buffer);

            // Upload the temporary file to Cloudinary
            const cloudinaryResponse = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(tempFilePath, { resource_type: 'auto', folder: 'E-Commerce' }, (error, result) => {
                    if (error) {
                        console.error('Error uploading image:', error);
                        reject(error);
                    } else {
                        imgUrl.push(result.url);
                        resolve();
                    }
                });
            });

            // Delete the temporary file
            fs.unlinkSync(tempFilePath);
        }

        body.imgURLs = imgUrl;
        const addedProduct = await addDoc(collection(db, "products"), body);

        let snapShot = {
            brandName: body.brandName,
            productId: addedProduct.id,
            category: body.category,
            productName: body.productName,
            productFirtsImgURL: imgUrl[0],
            discount: body.discount || "",
            price: body.price || "",
            variants: body.variants || "",
            stock: 0
        }

        const productSnapDetails = {
            ...snapShot,
            averageRating: 0 //fetch from API of Reviews and Rating ,
        }
        const productSnapDetailsRef = collection(db, "ProductSnapDetails")
        await addDoc(productSnapDetailsRef, productSnapDetails)

        const filteredVariant = snapShot.variants.map(item => {
            const filteredType = item.type.filter(subItem => subItem.price !== undefined);
            return filteredType.length > 0 ? { ...item, type: filteredType } : null;
        }).filter(item => item !== null);


        const RevenueSnapDetails = {
            ...snapShot,
            variants: filteredVariant,
            sold: 0,
            totalRevenue: 0
        }
        const RevenueSnapDetailsRef = collection(db, "Administration", "Admin", "Revenue")
        await addDoc(RevenueSnapDetailsRef, RevenueSnapDetails)

        const CategoryID = formData.get("categoryId")
        const categoryDocSnapshot = await getDoc(doc(db, "Administration", "Admin", "Category", CategoryID));
        const CategorySnapShot = { ...categoryDocSnapshot.data(), productCount: categoryDocSnapshot.data().productCount + 1 }
        const CategorySnapShotRef = doc(db, "Administration", "Admin", "Category", CategoryID);
        await updateDoc(CategorySnapShotRef, CategorySnapShot);

        return NextResponse.json({ status: 200 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}


// import { NextResponse } from "next/server";
// import { db } from "@/firebase-config/config";
// import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// const cloudinary = require('cloudinary');
// import cloudinary_config from "@/cloudinary-config/config";
// import streamifier from "streamifier"

// export const dynamic = "force-dynamic";
// export async function POST(req) {
//     try {
//         let imgUrl = []
//         const formData = await req.formData();
//         const body = JSON.parse(formData.get("body"))
//         const imgFileArray = formData.getAll("file")
//         const urlPromise = new Promise((resolve, reject) => {
//             imgFileArray.forEach(async (imgFile) => {
//                 const fileBuffer = await imgFile.arrayBuffer();
//                 const buffer = Buffer.from(fileBuffer);
//                 const stream = cloudinary.v2.uploader.upload_stream(
//                     { resource_type: 'auto', folder: 'E-Commerce' }, // Cloudinary options
//                     (error, result) => {
//                         if (error) {
//                             console.error('Error uploading image:', error);
//                             NextResponse.json({ statu: 500, error })
//                             return reject(error)
//                         } else {
//                             imgUrl.push(result.url)
//                             if (imgFileArray.length === imgUrl.length) resolve()
//                         }
//                     }
//                 ).end(buffer);
//                 // streamifier.createReadStream(buffer).pipe(stream)
//             })
//         })
//         await urlPromise
//         body.imgURLs = imgUrl
//         const addedProduct = await addDoc(collection(db, "products"), body);

//         let snapShot = {
//             brandName: body.brandName,
//             productId: addedProduct.id,
//             category: body.category,
//             productName: body.productName,
//             productFirtsImgURL: imgUrl[0],
//             discount: body.discount || "",
//             price: body.price || "",
//             variants: body.variants || "",
//             stock: 0
//         }

//         const productSnapDetails = {
//             ...snapShot,
//             averageRating: 0 //fetch from API of Reviews and Rating ,
//         }
//         const productSnapDetailsRef = collection(db, "ProductSnapDetails")
//         await addDoc(productSnapDetailsRef, productSnapDetails)

//         const filteredVariant = snapShot.variants.map(item => {
//             const filteredType = item.type.filter(subItem => subItem.price !== undefined);
//             return filteredType.length > 0 ? { ...item, type: filteredType } : null;
//         }).filter(item => item !== null);


//         const RevenueSnapDetails = {
//             ...snapShot,
//             variants: filteredVariant,
//             sold: 0,
//             totalRevenue: 0
//         }
//         const RevenueSnapDetailsRef = collection(db, "Administration", "Admin", "Revenue")
//         await addDoc(RevenueSnapDetailsRef, RevenueSnapDetails)

//         const CategoryID = formData.get("categoryId")
//         const categoryDocSnapshot = await getDoc(doc(db, "Administration", "Admin", "Category", CategoryID));
//         const CategorySnapShot = { ...categoryDocSnapshot.data(), productCount: categoryDocSnapshot.data().productCount + 1 }
//         const CategorySnapShotRef = doc(db, "Administration", "Admin", "Category", CategoryID);
//         await updateDoc(CategorySnapShotRef, CategorySnapShot);

//         return NextResponse.json({ status: 200 })
//     } catch (e) {
//         console.log('Error:', e);
//         return NextResponse.json({ status: 500, error: e });
//     }
// }


