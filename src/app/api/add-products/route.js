// "use server"
import { NextResponse } from "next/server";
// import { db } from "@/firebase-config/config";
// import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
const cloudinary = require('cloudinary');
// import cloudinary_config from "@/cloudinary-config/config";

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
//                 ).end(Uint8Array.from(JSON.parse(JSON.stringify(buffer)).data));
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


// import cloudinary from 'cloudinary';
import multer from 'multer';
// import { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
    cloud_name: 'dnbfy78fe',
    api_key: '364654966965189',
    api_secret: 'qJPZ7Yq77n852qVQ9k_A9XBjvyk'
});

const upload = multer({ storage: multer.memoryStorage() });

export const dynamic = "force-dynamic"
export async function POST(req) {
    if (req.method === 'POST') {
        try {
            const formData = await req.formData();
            upload.array('files')(req, NextResponse, async () => {
                const uploadedImages = [];

                for (const file of formData.getAll("file")) {
                    const fileBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(fileBuffer);
                    const result = cloudinary.v2.uploader.upload_stream({
                        resource_type: 'auto', folder: "E-Commerce"
                    }, (error, result) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log("jhg", result.secure_url)
                            uploadedImages.push(result.secure_url);
                        }
                    }).end(buffer);

                    if (result.error) {
                        console.error(result.error);
                    }
                }

                console.log(uploadedImages)
                return NextResponse.json({ urls: uploadedImages });
            });
            return NextResponse.json({ error: 'Server error.' });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Server error.' });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed.' });
    }
};
