"use server"
import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// const cloudinary = require('cloudinary');
// import cloudinary_config from "@/config/cloudinary-config";
import { addToIndex } from "@/algolia";


export async function POST(req) {
    try {
        // let imgUrl = []
        const formData = await req.formData();
        const body = JSON.parse(formData.get("body"))
        // const imgFileArray = formData.getAll("file")
        // const urlPromise = new Promise((resolve, reject) => {
        //     imgFileArray.forEach(async (imgFile) => {
        //         const fileBuffer = await imgFile.arrayBuffer();
        //         const buffer = Buffer.from(fileBuffer);
        //         const stream = cloudinary.v2.uploader.upload_stream(
        //             { resource_type: 'auto', folder: 'E-Commerce' }, // Cloudinary options
        //             (error, result) => {
        //                 if (error) {
        //                     console.log('Error uploading image:', error);
        //                     NextResponse.json({ statu: 500, error })
        //                     return reject(error)
        //                 } else {
        //                     imgUrl.push(result.url)
        //                     if (imgFileArray.length === imgUrl.length) resolve()
        //                 }
        //             }
        //         ).end(Uint8Array.from(JSON.parse(JSON.stringify(buffer)).data));
        //     })
        // })
        // await urlPromise

        // instead of uploading imgae from server uisng buffer stream of file, i am using direct upload method i.e image file from client side

        body.imgURLs = JSON.parse(formData.get("imgUrls"));
        console.log(body.imgURLs)
        const addedProduct = await addDoc(collection(db, "products"), body);

        let snapShot = {
            brandName: body.brandName,
            productId: addedProduct.id,
            category: body.category,
            productName: body.productName,
            productFirtsImgURL: body.imgURLs[0],
            discount: body.discount || "",
            price: body.price || "",
            variants: body.variants || "",
            stock: 0,
            allTags: body.allTags
        }

        const productSnapDetails = {
            ...snapShot,
            averageRating: 0 //fetch from API of Reviews and Rating ,
        }
        const productSnapDetailsRef = collection(db, "ProductSnapDetails")
        const data = await addDoc(productSnapDetailsRef, productSnapDetails)
        addToIndex(productSnapDetails, data.id);

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


